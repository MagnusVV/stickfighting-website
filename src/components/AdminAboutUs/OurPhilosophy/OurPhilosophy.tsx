'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './OurPhilosophy.module.css'
import { fetchObj } from '@/lib/types'

interface OurPhilosophyProps {
  philosophy: fetchObj
  setPhilosophy: React.Dispatch<React.SetStateAction<fetchObj | undefined>>
}

const OurPhilosophy: React.FC<OurPhilosophyProps> = ({
  philosophy,
  setPhilosophy,
}) => {
  const [userId, setUserId] = useState<string>('')

  //connect to supabase
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    //fetch the active session
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      //set the session as a state
      setUserId(user?.user.id as string)
    }

    fetchUserID()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //make update call to supabase
    const { data, error } = await supabase
      .from('our_philosophy')
      //update with the text from the form
      .update({ body_text: philosophy.body_text })
      .match({ id: 2, profile_id: userId })

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          name="about-us-text"
          cols={30}
          rows={10}
          placeholder="lorem ipsum"
          onChange={e => setPhilosophy({ body_text: e.target.value })}
          value={philosophy.body_text}
        ></textarea>
        <button type="submit">Uppdatera om oss</button>
      </form>
    </div>
  )
}

export default OurPhilosophy