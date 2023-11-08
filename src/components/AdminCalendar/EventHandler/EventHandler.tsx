import Button from '@/components/Button/Button'
import { Database } from '@/lib/codeBlockSupabase'
import useSupabaseClient from '@/lib/supabaseClient'

interface EventHandlerProps {
  selectedEvents: number[]
  onEventClick: (eventId: number) => void
}

const EventHandler: React.FC<EventHandlerProps> = ({
  selectedEvents, // Passed from AdminCalendar. Originates from SingleEvent.tsx -MV
  onEventClick, // Looks unused, but needs to be here!
}) => {
  const { supabase, userId } = useSupabaseClient()

  return (
    <div>
      <div>
        <h3>Uppdatera eller ta bort befintliga händelser</h3>
        {selectedEvents.map(eventId => (
          <p key={eventId}>Selected Event ID: {eventId}</p>
        ))}
        <div>
          <Button text="Ta bort" />
          <Button text="Uppdatera" />
        </div>
      </div>
      <div>
        <h3>Lägg till nya händelser</h3>
        <div>
          <Button text="Lägg till" />
        </div>
      </div>
    </div>
  )
}

export default EventHandler
