'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import styles from './AboutusSection.module.css'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'
import { Json } from '@/lib/codeBlockSupabase'

// Framer Motion animation, triggering when a certain amount of a section comes into view. -MV
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AboutUsSection = () => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [aboutObj, setAboutObj] = useState<JSONContent>()
  const [aboutJson, setAboutJson] = useState<JSONContent | Json>()
  const [infoText, setInfoText] = useState<string>('')
  const { supabase } = useSupabaseClient()

  // Defines when animation should trigger. -MV
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-25% 0px',
  })

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
    <motion.div
      className={styles.wrapper}
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <>
        {isReady ? (
          <>
            <h2>Om Föreningen</h2>
            <div className={styles.container}>
              {/* @ts-ignore FIXME: remove ts ignore */}
              <h3>{aboutObj.title}</h3>
              {parser(infoText)}
            </div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </>
    </motion.div>
  )
}

export default AboutUsSection
