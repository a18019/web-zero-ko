import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databaseId = process.env.NOTION_DATABASE_ID!;

export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

export function getTitle(
  page: PageObjectResponse,
  fallback = "タイトルなし",
): string {
  const prop = page.properties?.title;
  if (prop?.type === "title") {
    return prop.title[0]?.plain_text ?? fallback;
  }
  return fallback;
}

export function getCategory(page: PageObjectResponse, fallback = ""): string {
  const prop = page.properties?.category;
  if (prop?.type === "select") {
    return prop.select?.name || fallback;
  }
  return fallback;
}

export async function fetchPages(): Promise<PageObjectResponse[]> {
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

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
  });

  return response.results.filter(
    (result): result is PageObjectResponse =>
      result.object === "page" && "properties" in result,
  );
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

    for (const block of response.results) {
      const fullBlock = block as BlockObjectResponse;
      const blockWithChildren: BlockWithChildren = { ...fullBlock };

      if (fullBlock.has_children) {
        blockWithChildren.children = await fetchBlocksWithChildren(
          fullBlock.id,
        );
      }

      blocks.push(blockWithChildren);
    }

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}
