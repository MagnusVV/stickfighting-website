import styles from './../AdminCalendar.module.css'
import { FormattedEvent } from '@/lib/types'
import SingleEvent from './SingleEvent/SingleEvent'

interface ViewEventsProps {
  events: FormattedEvent[]
  onEventClick: (eventId: number) => void
}

const ViewEvents: React.FC<ViewEventsProps> = ({ events, onEventClick }) => {
  return (
    <div className={styles.eventContainer}>
      <ul className={styles.eventList}>
        {events.map(event => (
          <SingleEvent
            key={event.id}
            event={event}
            onEventClick={onEventClick} //Callback eventId. Originates from SingleEvent.tsx -MV
          />
        ))}
      </ul>
    </div>
  )
}

export default ViewEvents
