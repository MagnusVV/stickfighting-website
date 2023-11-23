'use client'
import { useState, useEffect } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'
import parser from 'html-react-parser'
import styles from './OurPhilosophy.module.css'
// Tiptap imports
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Framer Motion animation, triggering when a certain amount of a section comes into view. -MV
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const OurPhilosophy = () => {
  const [philosophy, setPhilosophy] = useState<JSONContent>()
  const [philosophyInfo, setPhilosophyInfo] = useState<JSONContent | Json>()
  const [philosophyString, setPhilosophyString] = useState<string>('')
  const [philosophyTitle, setPhilosophyTitle] = useState<Json>()
  const { supabase } = useSupabaseClient()

  // Defines when animation should trigger. -MV
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-25% 0px',
  })

  useEffect(() => {
    const philosophyFetch = async () => {
      const { data: philosophy, error } = await supabase
        .from('our_philosophy')
        .select('*')

      if (error) {
        console.log(error)
        return
      }

      if (philosophy) {
        // console.log(philosophy)
        setPhilosophy(philosophy)

        //set the body text
        const jsonInfo = philosophy.find(obj => obj.body_text)
        const jsonTitle = philosophy.find(title => title.title)
        setPhilosophyInfo(jsonInfo?.body_text)
        setPhilosophyTitle(jsonTitle?.title)
      }
    }
    philosophyFetch()
  }, [])

  useEffect(() => {
    if (philosophyInfo !== undefined) {
      //@ts-ignore FIXME: remove ts-ignore
      const output = generateHTML(philosophyInfo, [StarterKit])
      setPhilosophyString(output)
    }
  }, [philosophyInfo])

  return (
    <motion.div
      className={styles.wrapper}
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* @ts-ignore FIXME: remove ts-ignore */}
      {/* <h2>{philosophyTitle}</h2> */}
      <h2>Vår filosofi</h2>
      <div className={styles.container}>{parser(philosophyString)}</div>
    </motion.div>
  )
}

export default OurPhilosophy
