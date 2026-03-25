import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

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

export function getCategory(page: PageObjectResponse, fallback = ""): string {
  const category = page.properties.category;
  return category?.type === "select"
    ? (category.select?.name ?? fallback)
    : fallback;
}

export function getThumbnailUrl(
  page: PageObjectResponse,
  fallback = "",
): string {
  const prop = page.properties.thumbnail;
  if (prop?.type === "files") {
    const file = prop.files[0];
    if (file?.type === "file") return file.file.url;
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
      page_size: pageSize,
    });

    return response.results.filter(isPage);
  },
);

export function getEventTitle(page: PageObjectResponse, fallback = ""): string {
  const prop = page.properties.eventTitle;
  if (prop?.type === "rich_text") {
    return prop.rich_text[0]?.plain_text ?? fallback;
  }
  return fallback;
}

function formatDate(iso: string): string {
  return iso.split("T")[0].replaceAll("-", "/");
}

export function getEventDate(page: PageObjectResponse): {
  display: string;
  start: string;
  end: string | null;
} {
  const prop = page.properties.eventDate;
  if (prop?.type === "date" && prop.date) {
    const { start, end } = prop.date;
    const display = end
      ? `${formatDate(start)} - ${formatDate(end)}`
      : formatDate(start);
    return { display, start, end: end ?? null };
  }
  return { display: "", start: "", end: null };
}

export function getAuthor(page: PageObjectResponse, fallback = ""): string {
  const prop = page.properties.author;
  if (prop?.type === "rich_text") {
    return prop.rich_text[0]?.plain_text ?? fallback;
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

export async function fetchDailyLifeArticles(): Promise<PageObjectResponse[]> {
  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "category",
      select: { equals: "ゼロ高日常" },
    },
    sorts: [{ property: "publicationDate", direction: "descending" }],
    page_size: 3,
  });

  return response.results.filter(isPage);
}

export async function fetchEvents(): Promise<PageObjectResponse[]> {
  const dataSourceId = await getDataSourceId();
  const today = new Date().toISOString().split("T")[0];

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "category",
      select: { equals: "event" },
    },
    sorts: [{ property: "eventDate", direction: "ascending" }],
    page_size: 10,
  });

  const pages = response.results.filter(isPage);

  return pages
    .filter((page) => {
      const { start, end } = getEventDate(page);
      if (!start) return false;
      return (end ?? start) >= today;
    })
    .slice(0, 3);
}

export async function fetchPageWithBlocks(pageId: string) {
  const page = (await notion.pages.retrieve({
    page_id: pageId,
  })) as PageObjectResponse;
  const blocks = await fetchBlocksWithChildren(pageId);
  return { page, blocks };
}

export async function fetchBlocksWithChildren(
  blockId: string,
): Promise<BlockWithChildren[]> {
  const blocks: BlockWithChildren[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    const rawBlocks = response.results as BlockObjectResponse[];
    const withChildren = await Promise.all(
      rawBlocks.map(async (b) => ({
        ...b,
        ...(b.has_children && {
          children: await fetchBlocksWithChildren(b.id),
        }),
      })),
    );
    blocks.push(...withChildren);

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}
