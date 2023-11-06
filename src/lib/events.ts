import moment from 'moment'
import { FormattedEvent } from './types'

export const events: FormattedEvent[] = [
  {
    id: 1,
    start: moment('2023-11-05T10:00:00').toDate(),
    end: moment('2023-11-05T11:00:00').toDate(),
    title: 'Träning',
    cancelled: false,
  },
  {
    id: 2,
    start: moment('2023-11-17T12:00:00').toDate(),
    end: moment('2023-11-20T07:00:00').toDate(),
    title: 'Övernattning',
    cancelled: false,
  },
  {
    id: 3,
    start: moment('2023-11-29T09:00:00').toDate(),
    end: moment('2023-11-30T11:00:00').toDate(),
    title: 'Sist',
    cancelled: null,
  },
]
