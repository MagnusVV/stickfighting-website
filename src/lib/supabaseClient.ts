import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import { Database } from '@/lib/codeBlockSupabase'

// Supabase connection -MV
const supabase = createClientComponentClient<Database>()

const useSupabaseClient = () => {
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Fetch active session -MV
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      // Set session as state -MV
      setUserId(user?.user.id as string)
    }

    fetchUserID()
  }, [supabase.auth])

  return { supabase, userId }
}

export default useSupabaseClient
