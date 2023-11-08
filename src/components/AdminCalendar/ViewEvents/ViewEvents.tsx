import styles from './../AdminCalendar.module.css'
import { FormattedEvent } from '@/lib/types'
import SingleEvent from './SingleEvent/SingleEvent'
import { useState } from 'react'

const ViewEvents = ({ events }: { events: FormattedEvent[] }) => {
  const [selectedEvents, setSelectedEvents] = useState([])

  // This will get the select events back from SingleEvent -MV
  const getSelectedEvents = (callbackEvents: []) => {
    setSelectedEvents(callbackEvents)
  }

  return (
    <div className={styles.eventContainer}>
      <ul className={styles.eventList}>
        {events.map(event => (
          <SingleEvent key={event.id} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default ViewEvents
