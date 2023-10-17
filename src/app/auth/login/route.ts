import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { json } from 'stream/consumers'

export async function POST(request: Request) {
  console.log('tja')
  const requestUrl = new URL(request.url)
  const formData = await request.json()
  console.log(formData)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return new Response(JSON.stringify({ message: 'failed' }), { status: 401 })
  }
  return new Response(JSON.stringify({ message: 'succes' }), { status: 200 })
}
