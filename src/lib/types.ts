import { JSONContent } from '@tiptap/react'
import { Json } from './codeBlockSupabase'
import { CSSProperties } from 'react'

export interface fetchObj {
  title?: string
  body_text: string
}

export interface InstructorParams {
  id: number
  name: string
  body_text: JSONContent | Json
}

// Unnecessary array type, but was good for trying out Typescript -MV
export type InstructorCollection = InstructorParams[]

// CALENDAR PAGE TYPE & SUB-TYPES --- --->
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
  locale?: { name: string }
  instructors?: { name: string }
}
// <--- --- --- --- --- --- --- --- --- ---|

// ADMIN CALENDAR TYPES & SUB-TYPES --- --->
export interface SingleEventProps {
  event: FormattedEvent
  onEventClick: (eventId: number) => void
}

export interface ViewEventsProps {
  events: FormattedEvent[]
  onEventClick: (eventId: number) => void
}

export interface EventHandlerProps {
  selectedEvents: number[]
  onEventClick: (eventId: number) => void
}

// Fetched events -MV
export interface FetchedEvent {
  id: number
  locale_id: number
  instructor_id: number | null
  cancelled: boolean
  event_date: string
  event_start_time: string
  event_end_time: string
}

export interface EditedEvent extends Omit<FetchedEvent, 'cancelled'> {}

export interface NewEvent extends Omit<FetchedEvent, 'id'> {
  profile_id: string
}

// <--- --- --- --- --- --- --- --- --- ---|
