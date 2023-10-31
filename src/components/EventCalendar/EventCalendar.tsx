import styles from './EventCalendar.module.css'

// Importing react-big-calendar-package and time-zone-localiser -MV
import {
  Calendar,
  momentLocalizer,
  CalendarProps,
  ViewProps,
} from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

//Testing events in React big calendar -MV:
import { events } from '../../lib/events'

// Sets default time-zone -MV
moment.tz.setDefault('Europe/Stockholm')

const localizer = momentLocalizer(moment)

const EventCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  return (
    <div className={styles.calendarFrame}>
      <Calendar
        localizer={localizer}
        events={events}
        // FIXME: "views" doesn't work yet, but should. Needs to be fixed.
        views={['month', 'week', 'day', 'agenda']}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default EventCalendar
