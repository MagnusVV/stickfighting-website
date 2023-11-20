'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'
import styles from './InstructorSection.module.css'

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
        console.log('Instructors ', instructors)
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
        <div>
          {instructors.map(instructor => {
            const output = generateHTML(instructor.body_text, [StarterKit])
            return (
              <div className={styles.container} key={instructor.id}>
                <h2>{instructor.name}</h2>
                {parser(output)}
              </div>
            )
          })}
        </div>
      ) : (
        <p>Loading.....</p>
      )}
    </>
  )
}

export default InstructorSection
