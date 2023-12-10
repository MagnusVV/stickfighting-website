import styles from './EventCalendar.module.css'
// Importing react-big-calendar-package and time-zone-localiser -MV
import { Calendar, momentLocalizer, CalendarProps } from 'react-big-calendar'
import moment from 'moment-timezone'
// For changing of calendar to Swedish -MV
import 'moment/locale/sv'
// For formatting singele events -MV
import { FormattedEvent } from '@/lib/types'
import { useCallback, useRef } from 'react'
import PortalModal from '@/components/Modal/PortalModal'

// Sets default time-zone -MV
moment.tz.setDefault('Europe/Stockholm')
moment.locale('sv')

const localizer = momentLocalizer(moment)

const EventCalendar = (
  props: Omit<CalendarProps, 'localizer'> & { loading: boolean },
) => {
  const { events, loading } = props

  console.log('Events:', events)

  if (loading) {
    return <div>Läser in kalender...</div>
  }

  // Stupid TS-error. Thanks Chat-GPT for suggesting this. -MV
  const formattedEvents = events as FormattedEvent[]

  // Custom styling for React big calendar works a bid different, so this is easiet way to do it (for now?) to accomplish styling. -MV
  const eventStyleGetter = (
    event: FormattedEvent,
    start: Date,
    end: Date,
    isSelected: boolean,
  ) => {
    let style: React.CSSProperties = {
      backgroundColor: event.cancelled ? 'red' : '',
      color: event.cancelled ? 'white' : '',
      borderRadius: '1px',
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    style.height = `auto`
    style.padding = '2px'

    return { style }
  }

  return (
    <div className={styles.calendarFrame}>
      <Calendar
        views={['month' /* 'week', 'day' */]} // FIXME: If they need week and day view, uncomment them to activate them. -MV
        localizer={localizer}
        events={formattedEvents}
        popup
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={() => alert('clicked')} TODO: Add edit event functionality -MV
        messages={{
          today: 'Idag',
          previous: '<',
          next: '>',
          month: 'Månad',
          week: 'Vecka',
          day: 'Dag',
          agenda: 'Agenda',
        }}
        // Input and handlng of formatted events -MV
        eventPropGetter={eventStyleGetter}
        // Thanks Chat-GPT. Wouldn't have solved this by myself in time. -MV
        components={{
          event: props => (
            <div>
              <strong>{props.event.title.split('\n')[0]}</strong>
              {props.event.title
                .split('\n')
                .slice(1)
                .map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
            </div>
          ),
        }}
      />
    </div>
  )
}

export default EventCalendar
