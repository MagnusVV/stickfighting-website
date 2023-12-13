'use client'
import { useState, useEffect, ReactNode } from 'react'
import EventCalendar from '@/components/Calendar/CalendarWrapper/EventCalendar/EventCalendar'
import { FormattedEvent } from '@/lib/types'
import moment from 'moment'
import '../../Calendar/CalendarWrapper/calendar.css'
import useSupabaseClient from '@/lib/supabaseClient'
import PortalModal from '@/components/Modal/PortalModal'

const AdminCalendarWrapper = () => {
  // Supabase connection -MV
  const { supabase } = useSupabaseClient()
  const [events, setEvents] = useState<FormattedEvent[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Event selected in the calendar, passed to the PortalModal -MV
  const [selectedEvent, setSelectedEvent] = useState<FormattedEvent | null>(
    null,
  )
  const handleEventClick = (event: FormattedEvent): void => {
    setSelectedEvent(event)
  }
  const onModalClose = () => {
    setSelectedEvent(null)
  }

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
      setLoading(false)
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <EventCalendar
        events={events}
        loading={loading}
        onEventClick={handleEventClick}
      />
      {selectedEvent && (
        <PortalModal
          content={
            <>
              <p>{selectedEvent.id}</p>
              <p>{selectedEvent.title}</p>
              <p>{selectedEvent.locale as unknown as string}</p>
              {/* <p>{selectedEvent.start as unknown as string}</p>
              <p>{selectedEvent.end as unknown as string}</p> */}
              <p>{selectedEvent.instructors as unknown as string}</p>
            </>
          }
          modalIsOpen={selectedEvent === null ? false : true}
        />
      )}
    </div>
  )
}

export default AdminCalendarWrapper
