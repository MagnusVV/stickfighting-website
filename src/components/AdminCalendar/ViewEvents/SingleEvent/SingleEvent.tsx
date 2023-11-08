import { useState } from 'react'
import styles from './../../AdminCalendar.module.css'
import { FormattedEvent } from '@/lib/types'

interface SingleEventProps {
  event: FormattedEvent
  onEventClick: (eventId: number) => void
}

const SingleEvent: React.FC<SingleEventProps> = ({ event, onEventClick }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleClick = () => {
    setIsChecked(prevState => !prevState)
    onEventClick(event.id) // Passed down to fetch the callback "eventId". It originates from AdminCalendar.tsx -MV
  }

  // Styling of single elements -MV
  const conditionalClassName = (event: FormattedEvent) => {
    let conditionalClass = ''

    if (!isChecked && !event.cancelled) {
      conditionalClass = `${styles.eventListItem}`
    } else if (isChecked) {
      conditionalClass = `${styles.eventListItem} ${styles.checked}`
    } else if (!isChecked && event.cancelled) {
      conditionalClass = `${styles.eventListItem} ${styles.cancelled}`
    }
    return conditionalClass
  }

  return (
    <li className={conditionalClassName(event)} onClick={handleClick}>
      {`${event.start.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })} - ${event.end.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}  | ${event.title}`}
      {!event.cancelled ? <span> &#10004;</span> : <p>INSTÄLLT &#10060;</p>}
    </li>
  )
}

export default SingleEvent
