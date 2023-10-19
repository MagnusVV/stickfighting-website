import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'

const protectedRoute = ['/admin']
const adminLoginRoute = ['/login']

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const cookie = await supabase.auth.getSession()

  if (!cookie.data.session && protectedRoute.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  //If the user is logged in as admin he will be redirected to admin page instead of login
  if (cookie.data.session && adminLoginRoute.includes(req.nextUrl.pathname)) {
    const redirectToAdmin = new URL('/admin', req.nextUrl.origin)
    return NextResponse.redirect(redirectToAdmin.toString())
  }

  return res
}
