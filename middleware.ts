import { NextRequest, NextResponse } from 'next/server'

async function computeSessionToken(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + ':lacet_admin_v1')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session')?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    const expectedToken = await computeSessionToken(adminPassword)

    if (sessionCookie !== expectedToken) {
      const response = NextResponse.redirect(new URL('/admin', request.url))
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
