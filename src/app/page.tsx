import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '@/lib/supabaseServer'
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
  const { supabase } = useSupabaseServer()

  const { data: news } = await supabase.from('news').select()

  // TODO: Move this to own componenet? -MV
  const WelcomeVideo = () => {
    const {
      data: { publicUrl },
    } = supabase.storage.from('video').getPublicUrl('welcome/welcome_video')

    return (
      <div className={styles.videoContainer}>
        <video /* autoPlay */ muted loop className={styles.video}>
          <source src={publicUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <WelcomeVideo />
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
