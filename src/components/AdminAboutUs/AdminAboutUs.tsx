'use client'
import React, { useEffect, useState } from 'react'
import OurPhilosophy from './OurPhilosophy/OurPhilosophy'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import fetchObj from '@/lib/types'

interface Instructor {
  id: number
  name: string
  body_text: string
}

type Instructors = Instructor[]

const AdminAboutUs = () => {
  const [about, setAbout] = useState<fetchObj>()
  const [instructors, setInstructors] = useState<Instructors>()
  const [philosophy, setPhilosophy] = useState<fetchObj>()
  const supabase = createClientComponentClient<Database>()

  //fetch from the pivot table to get the specific information from the different tables
  useEffect(() => {
    const handleMasterFetch = async () => {
      let { data, error } = await supabase.from('about_page').select(`
        about_association(title, body_text),
        instructors(id, name, body_text),
        our_philosophy(title, body_text)
      `)

      if (error) {
        console.log(error)
      }

      if (data) {
        console.log(data)

        //set the fetch data into states
        setAbout(data[0]?.about_association as fetchObj)
        setPhilosophy(data[0]?.our_philosophy as fetchObj)
      }
    }

    handleMasterFetch()
  }, [supabase])

  console.log(instructors)

  // if Philosophy hasn't finished fetching data from supabase return a loading paragraph.
  return !philosophy ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>AdminAboutUsComponent</h1>
      <OurPhilosophy philosophy={philosophy} setPhilosophy={setPhilosophy} />
      <p>{about?.body_text}</p>
    </>
  )
}

export default AdminAboutUs
