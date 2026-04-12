import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFY_EMAIL

  if (apiKey && notifyEmail) {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'noreply@lacet.app',
      to: notifyEmail,
      subject: '✦ Elle a confirmé sa venue !',
      html: '<p>Elle a confirmé sa venue pour vendredi soir 18 avril à 18h30.</p>',
    })
  }

  return NextResponse.json({ ok: true })
}
