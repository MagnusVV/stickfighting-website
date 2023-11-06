export interface fetchObj {
  title?: string
  body_text: string
}

export interface InstructorParams {
  id: number
  name: string
  body_text: string
}

export type InstructorCollection = InstructorParams[]

// Fetched event format -MV
export interface Event {
  id: number
  cancelled: boolean
  event_date: string
  event_start_time: string
  event_end_time: string
  instructors: { name: string | null } | null
  locale: { name: string } | null
}

// Event formatted for calendar input -MV
export interface FormattedEvent {
  id: number
  start: Date
  end: Date
  title: string
  cancelled: boolean | null
}
