'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { Database } from '@/lib/codeBlockSupabase'

const OurPhilosophy = () => {
  const [aboutText, setAboutText] = useState<string>('')
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
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //make update call to supabase
    const { data, error } = await supabase
      .from('our_philosophy')
      .update({ body_text: 'funkar detta' })
      .match({ id: 2, profile_id: userId })

    if (error) {
      console.log(error)
    }

    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="about-us-text"
          cols={30}
          rows={10}
          placeholder="lorem ipsum"
          onChange={e => setAboutText(e.target.value)}
          value={aboutText}
        ></textarea>
        <button type="submit">Updatera om oss</button>
      </form>
      <p>{aboutText}</p>
    </>
  )
}

export default OurPhilosophy
