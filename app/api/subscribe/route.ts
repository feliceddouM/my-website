import { Resend } from 'resend'
import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const notion = new Client({ auth: process.env.NOTION_API_KEY })
const NEWSLETTER_DB_ID = process.env.NOTION_SUBSCRIBER_DB_ID!

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Get first audience ID
  const audiencesRes = await resend.audiences.list()
  if (audiencesRes.error || !audiencesRes.data?.data?.length) {
    return NextResponse.json({ error: 'No audience found' }, { status: 500 })
  }
  const audienceId = audiencesRes.data.data[0].id

  const { error } = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Save to Notion
  notion.pages.create({
    parent: { database_id: NEWSLETTER_DB_ID },
    properties: {
      Email: { title: [{ text: { content: email } }] },
    },
  }).catch((err: unknown) => console.warn('[subscribe] Notion save failed:', err))

  // Send notification email
  resend.emails.send({
    from: 'notify@worthit-ai.com',
    to: process.env.NOTIFY_EMAIL ?? 'hi.worthyai@gmail.com',
    subject: `新電子報訂閱：${email}`,
    html: `<p><b>${email}</b> 訂閱了值說電子報。</p>`,
  }).catch((err: unknown) => console.warn('[subscribe] Email notification failed:', err))

  return NextResponse.json({ success: true })
}
