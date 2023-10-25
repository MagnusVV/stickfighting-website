'use client'
import { useEffect, useState } from 'react'
import styles from './AboutUs.module.css'
import fetchObj from '@/lib/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'

interface AboutUsProps {
  about: fetchObj
  setAbout: React.Dispatch<React.SetStateAction<fetchObj | undefined>>
}

const AboutUs: React.FC<AboutUsProps> = ({ about, setAbout }) => {
  const [adminId, setAdminId] = useState<string>('')
  //connect to supabase
  const supabase = createClientComponentClient<Database>()

  //fetch the auth session from supabase
  useEffect(() => {
    //fetch the active session
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      //set the session as a state
      setAdminId(user?.user.id as string)
    }

    fetchUserID()
  }, [supabase.auth])

  const updateAbout = async (e: React.FormEvent<HTMLFormElement>) => {
    //prevent the form from reloading when you update
    e.preventDefault()
    const { error } = await supabase
      .from('about_association')
      .update({ body_text: about.body_text })
      //select the id from the table and the profile id
      .match({ id: 1, profile_id: adminId })

    if (error) {
      console.log(error)
    }

    alert('om oss uppdaterad')
  }

  return (
    <div className={styles.wrapper}>
      <h1>About update component</h1>
      <form className={styles.form} onSubmit={updateAbout}>
        <textarea
          className="about-update-form"
          name="about-us-text"
          cols={30}
          rows={10}
          placeholder="lorem ipsum"
          onChange={e => setAbout({ body_text: e.target.value })}
          value={about.body_text}
        ></textarea>
        <button type="submit">updatera om oss text</button>
      </form>
    </div>
  )
}

export default AboutUs
