'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'
import { cookies } from 'next/headers'
import type { Database } from '../../lib/codeBlockSupabase'

const AboutUsText = () => {
  const [aboutText, setAboutText] = useState<string>('')

  //connect to supabase
  const supabase = createClientComponentClient<Database>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(aboutText)

    //make update call to supabase
    const { data, error } = await supabase
      .from('our_philosophy')
      .insert({ body_text: 'hejsan' })

    if (error) {
      console.log(error)
    }
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

export default AboutUsText
