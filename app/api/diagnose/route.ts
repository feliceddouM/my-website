import { Client } from '@notionhq/client'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)
const DB_ID = '152a1c2bca734b80b4f2fd52cd397473'

export async function POST(req: NextRequest) {
  const { name, email, role, teamSize, timeSpent, toolCount, wishFor } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: Record<string, any> = {
    '姓名或暱稱': {
      title: [{ text: { content: name || '（未填）' } }],
    },
    'Email': { email },
    '想省下時間做什麼': {
      rich_text: [{ text: { content: wishFor || '' } }],
    },
    '跟進狀態': { select: { name: '待聯繫' } },
  }

  if (role)      properties['職稱或角色']  = { select: { name: role } }
  if (teamSize)  properties['團隊規模']    = { select: { name: teamSize } }
  if (timeSpent) properties['最花時間的事'] = { select: { name: timeSpent } }
  if (toolCount) properties['使用工具數量'] = { select: { name: toolCount } }

  try {
    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties,
    })

    // Send notification email (fire-and-forget, failure won't affect the user)
    resend.emails.send({
      from: 'notify@worthit-ai.com',
      to: process.env.NOTIFY_EMAIL ?? 'hi.worthyai@gmail.com',
      subject: `新流程健檢：${name || email}`,
      html: `
        <h2>新的流程健檢表單</h2>
        <table cellpadding="6" style="border-collapse:collapse;">
          <tr><td><b>姓名</b></td><td>${name || '（未填）'}</td></tr>
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>職稱/角色</b></td><td>${role || '（未填）'}</td></tr>
          <tr><td><b>團隊規模</b></td><td>${teamSize || '（未填）'}</td></tr>
          <tr><td><b>最花時間的事</b></td><td>${timeSpent || '（未填）'}</td></tr>
          <tr><td><b>使用工具數量</b></td><td>${toolCount || '（未填）'}</td></tr>
          <tr><td><b>想省下時間做什麼</b></td><td>${wishFor || '（未填）'}</td></tr>
        </table>
      `,
    }).catch((err: unknown) => console.warn('[diagnose] Email notification failed:', err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[diagnose] Notion error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
