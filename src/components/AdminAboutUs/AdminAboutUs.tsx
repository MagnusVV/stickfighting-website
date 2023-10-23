'use client'
import React, { useEffect, useState } from 'react'
import OurPhilosophy from './OurPhilosophy/OurPhilosophy'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'

interface fetchObj {
  title: string
  body_text: string
}

const AdminAboutUs = () => {
  const [about, setAbout] = useState<fetchObj | null>(null)
  const [instructors, setInstructors] = useState<{}>()
  const [philosophy, setPhilosophy] = useState<{}>()
  const supabase = createClientComponentClient<Database>()

  //fetch from the pivot table to get the specific information from the different tables
  const handleMasterFetch = async () => {
    let { data: about_page, error } = await supabase.from('about_page').select(`
    about_association(title, body_text),
    instructors(id, name, body_text),
    our_philosophy(title, body_text)
  `)

    if (error) {
      console.log(error)
    }

    if (about_page) {
      console.log(about_page)
      setAbout(about_page[0]?.about_association as fetchObj)
    }
  }

  return (
    <>
      <h1>AdminAboutUsComponent</h1>
      <OurPhilosophy />
      <button onClick={handleMasterFetch}>Fetch data</button>
      <p>{about?.body_text}</p>
    </>
  )
}

export default AdminAboutUs
