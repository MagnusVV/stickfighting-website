'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import EventCalendar from './EventCalendar/EventCalendar'
import { FormattedEvent } from '@/lib/types'
import moment from 'moment'
import { Database } from '@/lib/codeBlockSupabase'

// Supabase connection -MV
const supabase = createClientComponentClient<Database>()

const CalendarWrapper = () => {
  const [events, setEvents] = useState<FormattedEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      const userId = user?.user.id as string

      const { data: events, error } = await supabase
        .from('events')
        .select(
          `id, cancelled, event_date, event_start_time, event_end_time, instructors (name),locale (name)`,
        )

      if (error) {
        console.log(error)
      }

      // Builds array of event objects that R B Calendar can understand -MV
      const formattedEvents = (events ?? []).map(item => {
        return {
          id: item.id,
          start: moment(`${item.event_date}T${item.event_start_time}`).toDate(),
          end: moment(`${item.event_date}T${item.event_end_time}`).toDate(),
          title: `${item.locale?.name} - ${item.instructors?.name}`,
          cancelled: item.cancelled,
        }
      })

      setEvents(formattedEvents)
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <EventCalendar events={events} />
    </div>
  )
}

export default CalendarWrapper
