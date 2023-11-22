'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import styles from './InstructorSection.module.css'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'

const InstructorSection = () => {
  const [instructors, setinstructors] = useState<JSONContent[]>([])
  const [instructorReady, setInstructorReady] = useState<boolean>(false)
  const { supabase } = useSupabaseClient()

  useEffect(() => {
    const newsFetch = async () => {
      const { data: instructors, error } = await supabase
        .from('instructors')
        .select('*')

      if (error) {
        console.log(error)
        return
      }

      if (instructors) {
        setinstructors(instructors)
      }
    }
    newsFetch()
  }, [])

  useEffect(() => {
    if (instructors && instructors.length > 0) {
      setInstructorReady(true)
    } else {
      setInstructorReady(false)
    }
  }, [instructors])

  return (
    <>
      {instructorReady ? (
        <div className={styles.wrapper}>
          <div className={styles.instructorsContainer}>
            {instructors.map(instructor => {
              const output = generateHTML(instructor.body_text, [StarterKit])
              return (
                <div className={styles.container} key={instructor.id}>
                  <div>
                    <div className={styles.infoContainer}>
                      <h3 className={styles.instructorName}>
                        {instructor.name}
                      </h3>
                      {parser(output)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p>Loading.....</p>
      )}
    </>
  )
}

export default InstructorSection
