'use client'
import { generateHTML } from '@tiptap/core'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './HomeNews.module.css'
import parser from 'html-react-parser'
import useSupabaseClient from '@/lib/supabaseClient'
import { JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PortalModal from '../Modal/PortalModal'

const HomeNews = () => {
  const [text, setText] = useState<JSONContent[]>([])
  const { supabase } = useSupabaseClient()
  const [ready, setReady] = useState<boolean>(true)
  const [textOutput, setTextOutput] = useState<string>()
  useEffect(() => {
    const newsFetch = async () => {
      const { data: news, error } = await supabase.from('news').select('*')

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

  const bodyText = text.map(body => {
    return body.body_text
  })

  return (
    <>
      {ready ? (
        <div className={styles.newsWrapper}>
          {text.map((t, index) => {
            const output = generateHTML(t.body_text, [StarterKit])
            return (
              <div className={styles.individualNews} key={index}>
                <p>{t.created_at.slice(0, 10)}</p>
                <h3>{t.title}</h3>
                <h4>{t.ingress}</h4>
                {parser(output)}
                <PortalModal />
              </div>
            )
          })}
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  )
}

export default HomeNews
