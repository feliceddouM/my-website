/**
 * Notion API helper — uses @notionhq/client v5.x + notion-to-md v3
 *
 * SDK v5 changes from v4:
 *  - notion.databases.query()      →  notion.dataSources.query({ data_source_id })
 *  - notion.pages.retrieveMarkdown is RESTRICTED to public/OAuth integrations only;
 *    internal integrations (ntn_*) must use notion-to-md (blocks.children.list)
 */
import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const n2m = new NotionToMarkdown({ notionClient: notion as any })

// ── Shared helper ───────────────────────────────────────────────────────────

function extractText(richText: unknown[]): string {
  if (!Array.isArray(richText)) return ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return richText.map((t: any) => t.plain_text ?? '').join('')
}

// ── Types ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  publishedDate: string
}

export interface AutomationCase {
  id: string
  name: string
  description: string
  tools: string[]
  metric: string
  icon: string
  link: string
  order: number
}

// ── Blog Posts ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePost(page: PageObjectResponse): BlogPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as any
  return {
    id: page.id,
    title: extractText(props['標題']?.title ?? []),
    slug: extractText(props['Slug']?.rich_text ?? []),
    excerpt: extractText(props['摘要']?.rich_text ?? []),
    category: props['分類']?.select?.name ?? '',
    publishedDate: props['發布日期']?.date?.start ?? '',
  }
}

/** Returns all published blog posts, sorted newest-first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_BLOG_DB_ID!,
    filter: { property: '已發布', checkbox: { equals: true } },
    sorts: [{ property: '發布日期', direction: 'descending' }],
  })
  return res.results
    .filter((p): p is PageObjectResponse => p.object === 'page' && 'properties' in p)
    .map(parsePost)
}

/** Returns a single published post by its URL slug. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_BLOG_DB_ID!,
    filter: {
      and: [
        { property: '已發布', checkbox: { equals: true } },
        { property: 'Slug', rich_text: { equals: slug } },
      ],
    },
  })
  const page = res.results.find(
    (p): p is PageObjectResponse => p.object === 'page' && 'properties' in p
  )
  return page ? parsePost(page) : null
}

/**
 * Fetches a Notion page's content as Markdown via notion-to-md.
 * (notion.pages.retrieveMarkdown is restricted to public/OAuth integrations only)
 */
export async function getPostContent(pageId: string): Promise<string> {
  const blocks = await n2m.pageToMarkdown(pageId)
  return n2m.toMarkdownString(blocks).parent
}

/** Returns all published post slugs (used by sitemap). */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts()
  return posts.map((p) => p.slug).filter(Boolean)
}

// ── Automation Cases ────────────────────────────────────────────────────────

function parseCase(page: PageObjectResponse): AutomationCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as any
  return {
    id: page.id,
    name: extractText(props['名稱']?.title ?? []),
    description: extractText(props['描述']?.rich_text ?? []),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools: props['工具']?.multi_select?.map((t: any) => t.name) ?? [],
    metric: extractText(props['成果']?.rich_text ?? []),
    icon: extractText(props['圖示']?.rich_text ?? []),
    link: props['連結']?.url ?? '#',
    order: props['排序']?.number ?? 99,
  }
}

/** Returns all cases from the Automation Cases DB, sorted by 排序. */
export async function getCases(): Promise<AutomationCase[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_CASES_DB_ID!,
    sorts: [{ property: '排序', direction: 'ascending' }],
  })
  return res.results
    .filter((p): p is PageObjectResponse => p.object === 'page' && 'properties' in p)
    .map(parseCase)
}

// ── About Page ──────────────────────────────────────────────────────────────

/** Fetches the 關於我 Notion page content as Markdown via notion-to-md. */
export async function getAboutContent(): Promise<string> {
  const blocks = await n2m.pageToMarkdown(process.env.NOTION_ABOUT_PAGE_ID!)
  return n2m.toMarkdownString(blocks).parent
}
