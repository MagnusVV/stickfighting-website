'use client'
import useSupabaseClient from '@/lib/supabaseClient'
import { FormattedEvent } from '@/lib/types'
import { useState, useEffect } from 'react'
import moment from 'moment'
import styles from './AdminCalendar.module.css'
import ViewEvents from './ViewEvents/ViewEvents'
import EventHandler from './EventHandler/EventHandler'

const AdminCalendar: React.FC = () => {
  // Get supabase connection and user id from import. -MV
  const { supabase, userId } = useSupabaseClient()

  const [events, setEvents] = useState<FormattedEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      // const cookie = await supabase.auth.getSession()
      // const user = cookie.data.session
      // const userId = user?.user.id as string

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
    <>
      <h1>Schema-handler-component</h1>
      <h2>Calendar events</h2>
      <ViewEvents events={events} />
      <h2>Handle Calendar Events</h2>
      <EventHandler />
    </>
  )
}

export default AdminCalendar
