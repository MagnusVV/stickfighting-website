import styles from './EventCalendar.module.css'
// Importing react-big-calendar-package and time-zone-localiser -MV
import { Calendar, momentLocalizer, CalendarProps } from 'react-big-calendar'
import moment from 'moment-timezone'
// For changing of calendar to Swedish -MV:
import 'moment/locale/sv'

// Sets default time-zone -MV
moment.tz.setDefault('Europe/Stockholm')
moment.locale('sv')

const localizer = momentLocalizer(moment)

const EventCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const { events } = props

  return (
    <div className={styles.calendarFrame}>
      <Calendar
        // defaultView={Views.WEEK} FIXME: remove this part.
        views={['month', 'week', 'day']}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={{
          today: 'Idag',
          previous: '<',
          next: '>',
          month: 'Månad',
          week: 'Vecka',
          day: 'Dag',
          agenda: 'Agenda',
        }}
      />
    </div>
  )
}

export default EventCalendar