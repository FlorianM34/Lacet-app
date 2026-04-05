import { NextRequest, NextResponse } from 'next/server'

async function computeSessionToken(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + ':lacet_admin_v1')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body as { password: string }

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured')
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const sessionToken = await computeSessionToken(adminPassword)

    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 heures
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
