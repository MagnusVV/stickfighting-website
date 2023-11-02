import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const useSupabaseServer = () => {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  })
  return { supabase }
}

export default useSupabaseServer
