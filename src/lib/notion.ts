import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

import { notionPropertyProxyUrl } from "./notion-file";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databaseId = process.env.NOTION_DATABASE_ID!;

export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

function isPage(r: { object: string }): r is PageObjectResponse {
  return r.object === "page" && "properties" in r;
}

export function getTitle(
  page: PageObjectResponse,
  fallback = "タイトルなし",
): string {
  const prop = page.properties.title;
  return prop?.type === "title"
    ? (prop.title[0]?.plain_text ?? fallback)
    : fallback;
}

function getRawCategory(page: PageObjectResponse): string | undefined {
  const category = page.properties.category;
  return category?.type === "select" ? category.select?.name : undefined;
}

function parseCategoryProp(raw: string): { displayName: string; slug: string } {
  const idx = raw.indexOf("|");
  if (idx === -1) return { displayName: raw, slug: raw };
  return { displayName: raw.slice(0, idx), slug: raw.slice(idx + 1) };
}

export function getCategory(page: PageObjectResponse, fallback = ""): string {
  const raw = getRawCategory(page);
  if (!raw) return fallback;
  return parseCategoryProp(raw).displayName;
}

export function getCategorySlug(page: PageObjectResponse): string | undefined {
  const raw = getRawCategory(page);
  if (!raw) return undefined;
  return parseCategoryProp(raw).slug;
}

export function getThumbnailUrl(
  page: PageObjectResponse,
  fallback = "",
): string {
  const prop = page.properties.thumbnail;
  if (prop?.type === "files") {
    const file = prop.files[0];
    if (file?.type === "file")
      return notionPropertyProxyUrl(page.id, "thumbnail");
    if (file?.type === "external") return file.external.url;
  }
  return fallback;
}

let cachedDataSourceId: string | undefined;

async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;

  const database = await notion.databases.retrieve({
    database_id: databaseId,
  });
  if (!("data_sources" in database)) {
    throw new Error("データベース情報を完全に取得できませんでした。");
  }
  const dataSourceId = database.data_sources[0]?.id;
  if (!dataSourceId) {
    throw new Error("Notion data source が見つかりません。");
  }
  cachedDataSourceId = dataSourceId;
  return dataSourceId;
}

export const fetchPages = cache(
  async (pageSize = 10): Promise<PageObjectResponse[]> => {
    const dataSourceId = await getDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "status",
        status: { equals: "公開済み" },
      },
      sorts: [{ property: "publicationDate", direction: "descending" }],
      page_size: pageSize,
    });

    return response.results.filter(isPage);
  },
);

export function getAuthor(page: PageObjectResponse, fallback = ""): string {
  const prop = page.properties.author;
  if (prop?.type === "people") {
    const person = prop.people[0];
    if (person && "name" in person && person.name) return person.name;
  }
  return fallback;
}

export function getPublicationDate(
  page: PageObjectResponse,
  fallback = "",
): string {
  const prop = page.properties.publicationDate;
  if (prop?.type === "date" && prop.date) {
    const d = new Date(prop.date.start);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  }
  return fallback;
}

export function getFeatured(page: PageObjectResponse): number | null {
  const prop = page.properties.featured;
  if (prop?.type === "number" && prop.number != null) {
    return prop.number;
  }
  return null;
}

export function getStudentsMemoUrl(
  page: PageObjectResponse,
  fallback = "",
): string {
  const prop = page.properties.studentsMemo;
  if (prop?.type === "files") {
    const file = prop.files[0];
    if (file?.type === "file")
      return notionPropertyProxyUrl(page.id, "studentsMemo");
    if (file?.type === "external") return file.external.url;
  }
  return fallback;
}

export const fetchFeaturedPages = cache(
  async (limit = 4): Promise<PageObjectResponse[]> => {
    const dataSourceId = await getDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "status", status: { equals: "公開済み" } },
          { property: "featured", number: { is_not_empty: true } },
        ],
      },
      sorts: [
        { property: "featured", direction: "ascending" },
        { property: "publicationDate", direction: "descending" },
      ],
      page_size: limit,
    });

    return response.results.filter(isPage);
  },
);

export const fetchStudentsMemoPages = cache(
  async (limit = 4): Promise<PageObjectResponse[]> => {
    const dataSourceId = await getDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "status", status: { equals: "公開済み" } },
          { property: "studentsMemo", files: { is_not_empty: true } },
        ],
      },
      sorts: [{ property: "publicationDate", direction: "descending" }],
      page_size: limit,
    });

    return response.results.filter(isPage);
  },
);

export async function fetchPagesByCategory(
  rawCategory: string,
  pageSize = 100,
): Promise<PageObjectResponse[]> {
  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: "status", status: { equals: "公開済み" } },
        { property: "category", select: { equals: rawCategory } },
      ],
    },
    sorts: [{ property: "publicationDate", direction: "descending" }],
    page_size: pageSize,
  });

  return response.results.filter(isPage);
}

export type CategoryInfo = { displayName: string; slug: string; raw: string };

export const fetchActiveCategories = cache(
  async (): Promise<CategoryInfo[]> => {
    const pages = await fetchPages(100);
    const seen = new Map<string, CategoryInfo>();
    for (const page of pages) {
      const raw = getRawCategory(page);
      if (raw && !seen.has(raw)) {
        seen.set(raw, { ...parseCategoryProp(raw), raw });
      }
    }
    return Array.from(seen.values());
  },
);

export async function fetchPageWithBlocks(pageId: string) {
  const result = await notion.pages.retrieve({ page_id: pageId });
  if (!isPage(result)) {
    throw new Error(`Page not found: ${pageId}`);
  }
  const blocks = await fetchBlocksWithChildren(pageId);
  return { page: result, blocks };
}

export async function fetchBlocksWithChildren(
  blockId: string,
  maxDepth = 5,
  _currentDepth = 0,
): Promise<BlockWithChildren[]> {
  const blocks: BlockWithChildren[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    const rawBlocks = response.results.filter(
      (b): b is BlockObjectResponse => "type" in b,
    );
    const withChildren = await Promise.all(
      rawBlocks.map(async (b) => ({
        ...b,
        ...(b.has_children &&
          _currentDepth < maxDepth && {
            children: await fetchBlocksWithChildren(
              b.id,
              maxDepth,
              _currentDepth + 1,
            ),
          }),
      })),
    );
    blocks.push(...withChildren);

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}
