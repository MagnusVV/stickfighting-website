import styles from './EventCalendar.module.css'
// Importing react-big-calendar-package and time-zone-localiser -MV
import { Calendar, momentLocalizer, CalendarProps } from 'react-big-calendar'
import moment from 'moment-timezone'
// For changing of calendar to Swedish -MV
import 'moment/locale/sv'
// For formatting singele events -MV

// Sets default time-zone -MV
moment.tz.setDefault('Europe/Stockholm')
moment.locale('sv')

const localizer = momentLocalizer(moment)

const TestCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const { events } = props

  console.log('Events:', events)

  return (
    <div className={styles.calendarFrame}>
      <Calendar
        views={['month' /* 'week', 'day' */]}
        localizer={localizer}
        events={events}
        popup
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

export default TestCalendar
