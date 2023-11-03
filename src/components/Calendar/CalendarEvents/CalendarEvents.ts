import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import moment from 'moment'

const cookiesStore = cookies()
const supabase = createServerComponentClient<Database>({
  cookies: () => cookiesStore,
})

const fetchedEvents = []

const CalendarEvents = () => {}

export default CalendarEvents
