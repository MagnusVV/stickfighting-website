'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import EventCalendar from './EventCalendar/EventCalendar'
import { FormattedEvent } from '@/lib/types'
import moment from 'moment'
import { Database } from '@/lib/codeBlockSupabase'
import './calendar.css'

// Supabase connection -MV
const supabase = createClientComponentClient<Database>()

const CalendarWrapper = () => {
  const [events, setEvents] = useState<FormattedEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: fetchedEvents, error } = await supabase
        .from('events')
        .select(
          `id, cancelled, event_date, event_start_time, event_end_time, instructors (name),locale (name)`,
        )

      if (error) {
        console.log(error)
      }

      // Builds array of event objects that R B Calendar can understand -MV
      const formattedEvents = (fetchedEvents ?? []).map(item => {
        const start = moment(
          `${item.event_date}T${item.event_start_time}`,
        ).toDate()
        const end = moment(`${item.event_date}T${item.event_end_time}`).toDate()

        const startTime = moment(item.event_start_time, 'HH:mm:ss').format(
          'HH:mm',
        )
        const endTime = moment(item.event_end_time, 'HH:mm:ss').format('HH:mm')
        const titlePrefix = item.cancelled ? 'INSTÄLLT! \n' : ''
        const title = `${titlePrefix}${startTime} - ${endTime}\n${item.locale?.name}\n${item.instructors?.name}`

        return {
          id: item.id,
          start: start,
          end: end,
          title: title,
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
