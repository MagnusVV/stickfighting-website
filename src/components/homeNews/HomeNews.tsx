'use client'
import { generateHTML } from '@tiptap/core'
import React, { useEffect, useState } from 'react'
import styles from './HomeNews.module.css'
import parser from 'html-react-parser'
import useSupabaseClient from '@/lib/supabaseClient'
import { JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PortalModal from '../Modal/PortalModal'

// Framer Motion animation, triggering when a certain amount of a section comes into view. -MV
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const HomeNews: React.FC = () => {
  const [text, setText] = useState<JSONContent[]>([])
  const { supabase } = useSupabaseClient()
  const [ready, setReady] = useState<boolean>(true)

  // Defines when animation should trigger. -MV
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-25% 0px',
  })

  useEffect(() => {
    const newsFetch = async () => {
      const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.log(error)
        return
      }

      if (news) {
        setText(news)
      }
    }
    newsFetch()
  }, [])

  return (
    <>
      {ready ? (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={styles.newsWrapper}
        >
          {text.map((t, index) => {
            const output = generateHTML(t.body_text, [StarterKit])
            return (
              <div className={styles.individualNews} key={index}>
                <p>{t.created_at.slice(0, 10)}</p>
                <h3>{t.title}</h3>
                <h4>{t.ingress}</h4>
                {parser(output)}
                <PortalModal
                  content={
                    <>
                      <p>{t.created_at.slice(0, 10)}</p>
                      <h3>{t.title}</h3>
                      <h4>{t.ingress}</h4>
                      {parser(output)}
                    </>
                  }
                />
              </div>
            )
          })}
        </motion.div>
      ) : (
        <p>loading</p>
      )}
    </>
  )
}

export default HomeNews
