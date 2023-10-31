'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './Instructors.module.css'
import { InstructorCollection } from '@/lib/types'

interface InstructorsProps {
  instructors: InstructorCollection
}

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  const [userId, setUserId] = useState<string>('')

  // This state updates with every single key-input in the forms -MV
  const [instructorValues, setInstructorValues] = useState(instructors)

  // Supabase connection -MV
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    // Fetch active session -MV
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      // Set session as state -MV
      setUserId(user?.user.id as string)
    }

    fetchUserID()
  }, [supabase.auth])

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
    <>
      {instructors.map(instructor => {
        // Since you shouldn´t mutate states, we save the changes here before updating the state -MV
        const updatedInstructorValues = [...instructorValues]
        // Finds the specifc part of "instructorValues" state that will be updated -MV
        const valueToUpdate = updatedInstructorValues.find(
          value => value.id === instructor.id,
        )

        // TODO: Add Rich Text formatting, or similar? -MV

        return (
          <div key={instructor.id} className={styles.wrapper}>
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
    </>
  )
}

export default Instructors
