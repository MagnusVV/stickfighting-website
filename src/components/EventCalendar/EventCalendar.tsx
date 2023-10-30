import styles from './EventCalendar.module.css'
import 'node_modules/react-big-calendar/lib/css/react-big-calendar.css'

// Importing react-big-calendar-package and time-zone-localiser -MV
import { Calendar, momentLocalizer, CalendarProps } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

// Sets default time-zone -MV
moment.tz.setDefault('Europe/Stockholm')

const localizer = momentLocalizer(moment)

const EventCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  return (
    <div className={styles.calendarFrame}>
      <Calendar
        localizer={localizer}
        // events={trainingEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default EventCalendar
