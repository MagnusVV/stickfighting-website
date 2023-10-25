'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './Instructors.module.css'
import fetchObj from '@/lib/types'

interface InstructorsProps {
  instructors: fetchObj
  setInstructors: React.Dispatch<React.SetStateAction<fetchObj | undefined>>
}

const Instructors: React.FC<InstructorsProps> = ({
  instructors,
  setInstructors,
}) => {
  const [userId, setUserId] = useState<string>('')

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

    // Update call to supabase -MV
    const { data, error } = await supabase
      .from('instructors')
      // Update with text from form -MV
      .update({ body_text: instructors.body_text })
      .match({ id: 1, profile_id: userId })

    if (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          name="about-us-text"
          cols={30}
          rows={10}
          placeholder="lorem ipsum"
          onChange={e => setInstructors({ body_text: e.target.value })}
          value={instructors.body_text}
        ></textarea>
        <button type="submit">Uppdatera instruktör</button>
      </form>
    </>
  )
}
