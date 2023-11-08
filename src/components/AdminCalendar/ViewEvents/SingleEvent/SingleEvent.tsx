import { useState } from 'react'
import styles from './../../AdminCalendar.module.css'
import { FormattedEvent } from '@/lib/types'

const SingleEvent = ({ event }: { event: FormattedEvent }) => {
  const [isChecked, setIsChecked] = useState<string>('notChecked')

  const handleClick = () => {
    isChecked === 'notChecked'
      ? setIsChecked('checked')
      : setIsChecked('notChecked')
  }

  // Styling of single elements -MV
  const conditionalClassName = (event: FormattedEvent) => {
    let conditionalClass = ''

    if (isChecked !== 'checked' && !event.cancelled) {
      conditionalClass = `${styles.eventListItem}`
    } else if (isChecked === 'checked') {
      conditionalClass = `${styles.eventListItem} ${styles.checked}`
    } else if (isChecked !== 'checked' && event.cancelled) {
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
