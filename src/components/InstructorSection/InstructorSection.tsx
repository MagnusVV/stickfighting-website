'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import styles from './InstructorSection.module.css'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'

// Framer Motion animation, triggering when a certain amount of a section comes into view. -MV
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const InstructorSection = () => {
  const [instructors, setinstructors] = useState<JSONContent[]>([])
  const [instructorReady, setInstructorReady] = useState<boolean>(false)
  const { supabase } = useSupabaseClient()

  // Defines when animation should trigger. -MV
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-25% 0px',
  })

  useEffect(() => {
    const instructorsFetch = async () => {
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
    instructorsFetch()
  }, [])

  useEffect(() => {
    if (instructors && instructors.length > 0) {
      setInstructorReady(true)
    } else {
      setInstructorReady(false)
    }
  }, [instructors])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <>
        {instructorReady ? (
          <div className={styles.wrapper}>
            <div className={styles.instructorsContainer}>
              <h2 className={styles.instructorsHeader}>Våra instruktörer</h2>
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
    </motion.div>
  )
}

export default InstructorSection
