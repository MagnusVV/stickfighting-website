'use client'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
// Option 2: Browser-only (lightweight)
import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { generateText, useEditor } from '@tiptap/react'
// Option 1: Browser + server-side
import React, { useEffect, useMemo, useState } from 'react'
import styles from './HomeNews.module.css'
import parser from 'html-react-parser'
import useSupabaseClient from '@/lib/supabaseClient'
import { JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// const json = {
//   type: 'doc',
//   content: [
//     {
//       type: 'paragraph',
//       content: [
//         {
//           text: 'Detta är ',
//           type: 'text',
//         },
//         {
//           text: 'våran',
//           type: 'text',
//           marks: [
//             {
//               type: 'bold',
//             },
//           ],
//         },
//         {
//           text: ' filosofi när det kommer till ',
//           type: 'text',
//         },
//         {
//           text: 'kampsportträning',
//           type: 'text',
//           marks: [
//             {
//               type: 'italic',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       content: [
//         {
//           text: 'funkar detta?',
//           type: 'text',
//         },
//       ],
//     },
//   ],
// }

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
        console.log('news ', news)
        setText(news)
      }
    }
    newsFetch()
  }, [])
  console.log('text ', text)

  const bodyText = text.map(body => {
    return body.body_text
  })

  //   if (text !== undefined) {
  //     setReady(true)
  //   }

  //check so bodyText isn't empty
  //   const validateBody = bodyText.filter(text => text !== null)
  //   console.log('json ', typeof json)
  //   console.log('bodyText ', bodyText)
  //   console.log('validateBody ', validateBody)

  //   if (bodyText.length > 0) {
  //     const OutputComponent = ({TextInput}) => {

  //         const output = generateHTML(bodyText, [
  //             Document,
  //             Paragraph,
  //             Text,
  //             Bold,
  //             Italic,
  //             ListItem,
  //             BulletList,
  //             // StarterKit,
  //         ])
  //         setTextOutput(output)
  //         setReady(true)

  //         return <OutputComponent TextInput={output} />
  //     }
  //   }

  return (
    <>
      {ready ? (
        <div>
          <div className={styles.newsWrapper}>
            {text.map((t, index) => {
              const output = generateHTML(t.body_text, [StarterKit])
              return (
                <div className={styles.individualNews} key={index}>
                  <p>{t.title}</p>
                  <p>{t.ingress}</p>
                  {parser(output)}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  )
}

export default HomeNews
