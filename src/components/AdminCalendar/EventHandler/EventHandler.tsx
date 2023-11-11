import Button from '@/components/Button/Button'
import useSupabaseClient from '@/lib/supabaseClient'
import { ChangeEvent, useEffect, useState } from 'react'
import { EventHandlerProps, FetchedEvent } from '@/lib/types'

const EventHandler: React.FC<EventHandlerProps> = ({
  selectedEvents, // Array with event.id:s from selected existing events, passed from AdminCalendar. Originates from SingleEvent.tsx -MV
  onEventClick, // Looks unused, but needs to be here for event selection to work!
}) => {
  const { supabase, userId } = useSupabaseClient()

  // For handling start and end time for event -MV
  const [startTime, setStartTime] = useState<string>('11:30')

  const [instructors, setInstructors] = useState<
    { id: number; name: string | null }[] | null
  >(null)
  const [locales, setLocales] = useState<{ id: number; name: string }[] | null>(
    null,
  )
  const [events, setEvents] = useState<FetchedEvent[] | null>(null)

  // By default the event end time is set to 90 minutes after event start time -MV
  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newStartTime: string = e.target.value
    setStartTime(newStartTime)
  }

  useEffect(() => {
    const fetchLocales = async () => {
      const { data: locales, error } = await supabase
        .from('locale')
        .select(`id, name`)

      if (error) {
        console.log(error)
      }

      setLocales(locales)
    }

    const fetchInstructors = async () => {
      const { data: instructors, error } = await supabase
        .from('instructors')
        .select(`id, name`)

      if (error) {
        console.log(error)
      }

      setInstructors(instructors)
    }

    const fetchEvents = async () => {
      const { data: fetchedEvents, error } = await supabase
        .from('events')
        .select(
          `id, locale_id, instructor_id, cancelled, event_date, event_start_time, event_end_time, profile_id`,
        )

      if (error) {
        console.log(error)
      }

      setEvents(fetchedEvents)
    }

    fetchLocales()
    fetchInstructors()
    fetchEvents()
  }, [])

  // Cancels or un-cancels choosen events -MV

  const handleCancelEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedEvents.length < 1) {
      alert('Inga rader markerade!')
      return
    }

    for (let eventId of selectedEvents) {
      const event = events?.find(e => e.id === eventId)
      if (event) {
        const updateCancelledStaus = !event.cancelled
        await supabase
          .from('events')
          .update({ cancelled: updateCancelledStaus })
          .eq('id', eventId)
      }
    }
  }

  return (
    <div>
      {/* --- Remove one or more chosen events --- -MV */}

      <h3>Ta bort valda händelser</h3>
      {/* {selectedEvents.map(eventId => (
        <p key={eventId}>Selected Event ID: {eventId}</p>
      ))} */}
      <div>
        <form id="remove" action="">
          <Button type="submit" text="Ta bort" />
        </form>
      </div>

      {/* --- Cancel one or more chosen events --- -MV */}

      <h3>Ställ in/ångra ställ in valda händelser</h3>
      <div>
        <form id="cancel" onSubmit={handleCancelEvent}>
          <Button type="submit" text="Acceptera" />
        </form>
      </div>

      {/* --- Edit a single chosen event --- -MV */}

      <h3>Redigera vald händelse</h3>
      <div>
        <form id="edit" action="">
          <label htmlFor="edit_datePicker">
            Datum:{' '}
            <input
              type="date"
              name="editEventDate"
              id="edit_datePicker"
              defaultValue={
                selectedEvents.length === 1
                  ? events?.find(event => event.id === selectedEvents[0])
                      ?.event_date
                  : getDate()
              }
            />
          </label>
          <label htmlFor="edit_timeStart">
            Starttid:{' '}
            <input
              type="time"
              name="editEventstartTime"
              id="edit_timeStart"
              defaultValue={
                selectedEvents.length === 1
                  ? events?.find(event => event.id === selectedEvents[0])
                      ?.event_start_time
                  : startTime
              }
              onChange={handleStartTimeChange}
            />
          </label>
          <label htmlFor="edit_timeEnd">
            Sluttid:{' '}
            <input
              type="time"
              name="editEventEndTime"
              id="edit_timeEnd"
              defaultValue={
                selectedEvents.length === 1
                  ? events?.find(event => event.id === selectedEvents[0])
                      ?.event_end_time
                  : calculateEndTime(startTime)
              }
            />
          </label>
          <label htmlFor="edit_locale">
            Plats:{' '}
            <select name="localeSelection" id="edit_locale">
              {locales?.map(locale => {
                const isSelected =
                  selectedEvents.length === 1 &&
                  events &&
                  events.find(event => event.id === selectedEvents[0])
                    ?.locale_id === locale.id

                return (
                  <option
                    key={locale.id}
                    value={locale.id}
                    selected={isSelected ? true : undefined}
                  >
                    {locale.name}
                  </option>
                )
              })}
            </select>
          </label>
          <label htmlFor="edit_instructor">
            Instruktör:{' '}
            <select name="instructorSelection" id="edit_instructor">
              {instructors?.map(instructor => {
                const isSelected =
                  selectedEvents.length === 1 &&
                  events &&
                  events.find(event => event.id === selectedEvents[0])
                    ?.instructor_id === instructor.id

                return (
                  <option
                    key={instructor.id}
                    value={instructor.id}
                    selected={isSelected ? true : undefined}
                  >
                    {instructor.name ?? '-'}
                  </option>
                )
              })}
            </select>
          </label>
          <Button type="submit" text="Uppdatera" />
        </form>
      </div>

      {/* --- Add a single new event --- -MV */}

      <h3>Lägg till ny händelse</h3>
      <div>
        <form id="add" action="">
          <label htmlFor="add_datePicker">
            Datum:{' '}
            <input
              type="date"
              name="newEventDate"
              id="add_datePicker"
              defaultValue={getDate()}
            />
          </label>
          <label htmlFor="add_timeStart">
            Starttid:{' '}
            <input
              type="time"
              name="newEventStartTime"
              id="add_timeStart"
              defaultValue={startTime}
              onChange={handleStartTimeChange}
            />
          </label>
          <label htmlFor="add_timeEnd">
            Sluttid:{' '}
            <input
              type="time"
              name="newEventEndTime"
              id="add_timeEnd"
              defaultValue={calculateEndTime(startTime)}
            />
          </label>
          <label htmlFor="add_locale">
            Plats:{' '}
            <select name="localeSelection" id="add_locale">
              {locales?.map(locale => (
                <option key={locale.id} value={locale.id}>
                  {locale.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="add_instructor">
            Instruktör:{' '}
            <select name="instructorSelection" id="add_instructor">
              {instructors?.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name ?? '-'}
                </option>
              ))}
            </select>
          </label>
          <Button text="Lägg till" />
        </form>
      </div>
    </div>
  )
}

export default EventHandler

// <--- --- --- FUNCTIONS FOR INPUT FIELDS AND STATES --- --- --->

// Creates default values for form DATE fields -MV
const getDate = () => {
  const today = new Date()
  const yyyy = today.getFullYear().toString()
  const mm = today.getMonth() + 1
  const dd = today.getDate()

  let mmString = mm.toString()
  let ddString = dd.toString()

  if (mm < 10) {
    mmString = '0' + mmString
  }

  if (dd < 10) {
    ddString = '0' + ddString
  }

  const todayString = `${yyyy}-${mmString}-${ddString}`
  return todayString
}

// Creates default values for event end time -MV
const calculateEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes
  const endTimeTotalMinutes = (totalMinutes + 90) % (24 * 60) // Ensures the day only has 24 hours -MV
  const endTimeHours = Math.floor(endTimeTotalMinutes / 60)
  const endTimeMinutes = endTimeTotalMinutes % 60
  const formattedEndTime =
    (endTimeHours < 10 ? '0' : '') +
    endTimeHours +
    ':' +
    (endTimeMinutes < 10 ? '0' : '') +
    endTimeMinutes

  return formattedEndTime
}

// <--- --- --- --- --- --- --- --- --- --- --- --- --- ---|
