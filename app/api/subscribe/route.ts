import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  return NextResponse.json({ success: true })
}
