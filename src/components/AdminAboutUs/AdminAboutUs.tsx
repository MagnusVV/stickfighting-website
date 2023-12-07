'use client'
import {
  JSXElementConstructor,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import { fetchObj, InstructorCollection } from '@/lib/types'
import OurPhilosophy from './OurPhilosophy/OurPhilosophy'
import AboutUs from './AboutUs/AboutUs'
import Instructors from './Instructors/Instructors'
import styles from './AdminAboutUs.module.css'
import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'
import DynamicSection from '../dynamicSection/DynamicSection'

const AdminAboutUs = () => {
  const [about, setAbout] = useState<fetchObj>()
  const [instructors, setInstructors] = useState<InstructorCollection>([])
  const [philosophy, setPhilosophy] = useState<fetchObj>()
  const supabase = createClientComponentClient<Database>()
  // const [dynamicSections, setDynamicSections] = useState<Array<JSX.Element>>([])
  const [dynamicTestSections, setDynamicTestSections] = useState<
    Array<JSX.Element>
  >([])

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
        //set the fetch data into states
        setAbout(data[0]?.about_association as fetchObj)
        setPhilosophy(data[0]?.our_philosophy as fetchObj)

        const instructorsList = data.map(item => item.instructors)

        setInstructors(instructorsList as InstructorCollection)
      }
    }

    handleMasterFetch()
  }, [supabase])

  //dynamic component----------------------------------->
  const section = (key: number): JSX.Element => {
    return <DynamicSection key={key} />
  }

  //create a random key for the dynamic component
  let randomKey: number = Math.floor(Math.random() * 100000)
  // add dynamic component to array
  const addSection = () => {
    setDynamicTestSections(dynamicTestSections => [
      ...dynamicTestSections,
      section(randomKey++),
    ])
  }
  console.log('dynamic section ', dynamicTestSections)

  //dynamic component----------------------------------->

  // if Philosophy, imstructors or about hasn't finished fetching data from supabase return a loading paragraph.
  return !philosophy || !about || !instructors ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.wrapper}>
      <AboutUs about={about} setAbout={setAbout} />
      <OurPhilosophy />
      <Instructors instructors={instructors} />
      {dynamicTestSections.length > 0 && dynamicTestSections}
      <Button
        text="&#43;"
        styling={genericButton}
        type="button"
        onClickEvent={addSection}
      />
    </div>
  )
}

export default AdminAboutUs
