'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import styles from './AboutusSection.module.css'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'
import { Json } from '@/lib/codeBlockSupabase'

const AboutUsSection = () => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [aboutObj, setAboutObj] = useState<JSONContent>()
  const [aboutJson, setAboutJson] = useState<JSONContent | Json>()
  const [infoText, setInfoText] = useState<string>('')
  const { supabase } = useSupabaseClient()

  useEffect(() => {
    const fetchAbout = async () => {
      const { data: about, error } = await supabase
        .from('about_association')
        .select('*')

      if (error) {
        console.log(error)
        return
      }

      if (about) {
        setAboutObj(about)

        //set the data
        const json = about.find(obj => obj.body_text)

        setAboutJson(json?.body_text)

        setIsReady(true)
      }
    }
    fetchAbout()
  }, [])

  useEffect(() => {
    if (aboutJson !== undefined) {
      //@ts-ignore FIXME: remove ts ignore
      const output = generateHTML(aboutJson, [StarterKit])
      setInfoText(output)
    }
  }, [aboutJson])

  return (
    <>
      {isReady ? (
        <div className={styles.wrapper}>
          <h2>Om Föreningen</h2>
          <div className={styles.container}>
            {/* @ts-ignore FIXME: remove ts ignore */}
            <h3>{aboutObj.title}</h3>
            {parser(infoText)}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  )
}

export default AboutUsSection
