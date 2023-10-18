// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })
//   await supabase.auth.getSession()
//   return res
// }

import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { log } from 'console'
import { cookies } from 'next/headers'

const protectedRoute = ['/admin']

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const cookie = await supabase.auth.getSession()
  // const cookie = cookies()

  if (!cookie.data.session && protectedRoute.includes(req.nextUrl.pathname)) {
    console.log('middleware')
    const absoluteURL = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (cookie.data.session && protectedRoute.includes(req.nextUrl.pathname)) {
    console.log('yay cookie from middleware: ')
  }

  return res
}
