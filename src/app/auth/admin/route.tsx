import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminAuth() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('session: ' + session)

  if (!session) {
    redirect('/login')
  } else {
    console.log('hej från adminAuth')
  }
}
