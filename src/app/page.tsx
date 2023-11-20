import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
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
import { useMemo } from 'react'
import parser from 'html-react-parser'
import { JSONContent } from '@tiptap/react'
import HomeNews from '@/components/homeNews/HomeNews'

export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  })

  const { data: news } = await supabase.from('news').select()

  //set the json content from supabase
  // news?.map(singleNews => {
  //   const json: any = singleNews.body_text
  //   console.log(json)

  // })

  // const html = news?.map(
  //   bodyText => {
  //     return generateHTML(news, [
  //       Document,
  //       Paragraph,
  //       Text,
  //       Bold,
  //       Italic,
  //       ListItem,
  //       BulletList,
  //     ])
  //   },
  //   [news],
  // )

  return (
    <main className={styles.main}>
      <NavBar />
      <h1>HOME</h1>
      <section className={styles.newsSection}>
        <h2>Nyheter</h2>
        <div>
          <HomeNews />
        </div>
      </section>
    </main>
  )
}
