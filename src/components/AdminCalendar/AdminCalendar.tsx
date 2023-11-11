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
  const { supabase } = useSupabaseClient()

  const [events, setEvents] = useState<FormattedEvent[]>([])

  // The callback, eventId, from ViewEvents and SingleEvent is then passed to Eventhandler -MV --->
  const [selectedEvents, setSelectedEvents] = useState<number[]>([])

  const handleEventClick = (eventId: number) => {
    setSelectedEvents(prevState => {
      if (prevState.includes(eventId)) {
        return prevState.filter(id => id !== eventId)
      } else {
        return [...prevState, eventId]
      }
    })
  }

  // <--- --- --- --- --- --- --- --- --- --- --- --- ---|

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: fetchedEvents, error } = await supabase
        .from('events')
        .select(
          `id, cancelled, event_date, event_start_time, event_end_time, instructors (name),locale (name)`,
        )
        .order('event_date', { ascending: true })

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
      <ViewEvents events={events} onEventClick={handleEventClick} />
      <h2>Handle Calendar Events</h2>
      <EventHandler
        selectedEvents={selectedEvents}
        onEventClick={handleEventClick}
      />
    </>
  )
}

export default AdminCalendar
