import moment from 'moment'

export const test = [
  {
    id: 4,
    start: moment('2023-12-20T11:00:00.000Z').toDate(),
    end: moment('2023-12-20T12:30:00.000Z').toDate(),
    title: 'INSTÄLLT! \n12:00 - 13:30\nAndra träningsplatsen\nTommy Pherson',
    cancelled: true,
  },
  {
    id: 3,
    start: moment('2023-12-12T10:30:00.000Z').toDate(),
    end: moment('2023-12-12T12:00:00.000Z').toDate(),
    title: '11:30 - 13:00\nFörsta träningsplatsen\nTommy Pherson',
    cancelled: false,
  },
  {
    id: 5,
    start: moment('2023-12-17T09:00:00.000Z').toDate(),
    end: moment('2023-12-17T11:30:00.000Z').toDate(),
    title: '10:00 - 12:30\nFörsta träningsplatsen\nJohan Flink',
    cancelled: false,
  },
  {
    id: 8,
    start: moment('2023-12-22T19:30:00.000Z').toDate(),
    end: moment('2023-12-22T21:00:00.000Z').toDate(),
    title: '20:30 - 22:00\nAndra träningsplatsen\nJohan Flink',
    cancelled: false,
  },
  {
    id: 2,
    start: moment('2023-12-07T08:30:00.000Z').toDate(),
    end: moment('2023-12-07T10:00:00.000Z').toDate(),
    title: '09:30 - 11:00\nFörsta träningsplatsen\nJohan Flink',
    cancelled: false,
  },
  {
    id: 9,
    start: moment('2023-12-13T10:30:00.000Z').toDate(),
    end: moment('2023-12-13T12:00:00.000Z').toDate(),
    title: '11:30 - 13:00\nFörsta träningsplatsen\nTommy Pherson',
    cancelled: false,
  },
]
