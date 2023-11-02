'use client'
import { useState } from 'react'
import styles from './Instructors.module.css'
import { InstructorCollection } from '@/lib/types'
import useSupabaseClient from '../../../lib/supabaseClient'

interface InstructorsProps {
  instructors: InstructorCollection
}
const { supabase, userId } = useSupabaseClient()

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  // Get supabase connection and user id from import. -MV

  // This state updates with every single key-input in the forms -MV
  const [instructorValues, setInstructorValues] = useState(instructors)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Adding userId to "instructorValues" -MV
    const authInstructorValues = instructorValues.map(instructorValue => ({
      ...instructorValue,
      profile_id: userId,
    }))

    // Update call to supabase -MV
    const { data, error } = await supabase
      .from('instructors')
      // Update with text from form -MV
      .upsert(authInstructorValues)

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2>Våra instruktörer</h2>
      {instructors.map(instructor => {
        // Since you shouldn't mutate states, we save the changes here before updating the state -MV
        const updatedInstructorValues = [...instructorValues]
        // Finds the specifc part of "instructorValues" state that will be updated -MV
        const valueToUpdate = updatedInstructorValues.find(
          value => value.id === instructor.id,
        )

        // TODO: Add Rich Text formatting, or similar? -MV

        return (
          <div key={instructor.id}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Instructor name */}
              <textarea
                className={styles.textarea}
                name={`instructor_${instructor.name}_name`}
                cols={30}
                rows={1}
                placeholder="lorem ipsum"
                onChange={e => {
                  if (valueToUpdate) {
                    valueToUpdate.name = e.target.value
                    setInstructorValues(updatedInstructorValues)
                  }
                }}
                value={valueToUpdate?.name}
              ></textarea>
              {/* Instructor facts */}
              <textarea
                className={styles.textarea}
                name={`instructor_${instructor.name}_information`}
                cols={30}
                rows={10}
                placeholder="lorem ipsum"
                onChange={e => {
                  if (valueToUpdate) {
                    valueToUpdate.body_text = e.target.value
                    setInstructorValues(updatedInstructorValues)
                  }
                }}
                value={valueToUpdate?.body_text}
              ></textarea>
              <button type="submit">Uppdatera instruktör</button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default Instructors
