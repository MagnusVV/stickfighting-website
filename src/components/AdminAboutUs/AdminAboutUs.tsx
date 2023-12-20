'use client'
import { useEffect, useState } from 'react'
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
import useSupabaseClient from '@/lib/supabaseClient'
// tiptap imports
import TipTap, { MenuBar } from '@/components/Tiptap/Tiptap'
import {
  JSONContent,
  generateHTML,
  EditorContent,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// interface dynamicSectionType {
//   sectionTitle: string
//   title: string
//   bodyText: JSONContent
// }

// type dynamicSectionsTypes = Array<dynamicSectionType>

const AdminAboutUs = () => {
  const [about, setAbout] = useState<fetchObj>()
  const [instructors, setInstructors] = useState<InstructorCollection>([])
  const [philosophy, setPhilosophy] = useState<fetchObj>()
  const [dynamicTestSections, setDynamicTestSections] = useState<
    Array<JSX.Element>
  >([])
  const [dynamicText, setDynamicText] = useState<JSONContent>()
  const [newDynamicSection, setNewDynamicSection] = useState<JSONContent>([])

  //connect to supabase
  const { supabase, userId } = useSupabaseClient()

  //TODO: remove unnecessary fetches
  //fetch from the pivot table to get the specific information from the different tables
  useEffect(() => {
    const handleMasterFetch = async () => {
      // let { data, error } = await supabase.from('about_page').select(`
      //   about_association(title, body_text),
      //   instructors(id, name, body_text),
      //   our_philosophy(title, body_text)
      // `)

      // if (error) {
      //   console.log(error)
      // }

      // if (data) {
      //   //set the fetch data into states
      //   setAbout(data[0]?.about_association as fetchObj)
      //   setPhilosophy(data[0]?.our_philosophy as fetchObj)

      //   const instructorsList = data.map(item => item.instructors)

      //   setInstructors(instructorsList as InstructorCollection)
      // }
      const { data, error } = await supabase.from('dynamic_section').select('*')

      if (error) {
        console.log(error)
      }

      if (data) {
        // setNewDynamicSection(
        //   newDynamicSection =>
        //     [...newDynamicSection, data] as dynamicSectionsTypes,
        // )
        setNewDynamicSection(data)
      }
    }

    handleMasterFetch()
  }, [supabase])

  //create custom component to update the editor instance in the loop
  const DynamicEditor = ({ content }: any) => {
    const editor = useEditor({
      content: content,
      extensions: [StarterKit],
      // onCreate: () => {
      //   // setIsReady(true)
      // },
      onUpdate: ({ editor }) => {
        const json = editor.getJSON()
        // //@ts-ignore //TODO: fix ts ignore
        setDynamicText(json.body_text)
      },
    })

    return <EditorContent editor={editor} />
  }

  //create menu editor
  const menuEditor = useEditor({
    content: '',
    extensions: [StarterKit],
  })

  //creating dynamic component----------------------------------->
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
  //end dynamic component----------------------------------->

  // if Philosophy, imstructors or about hasn't finished fetching data from supabase return a loading paragraph.
  return (
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
      {newDynamicSection.map((item: any, index: number) => {
        return (
          <div>
            {/* <div key={index}>
              // <h1>{item.sectionTitle}</h1>
              // <p>{item.bodyText}</p>
            </div> */}
            <MenuBar editor={menuEditor} />
            <DynamicEditor content={item.body_text} />
          </div>
        )
      })}
    </div>
  )
}

export default AdminAboutUs
