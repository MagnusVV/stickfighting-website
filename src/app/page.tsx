import Image from 'next/image'
import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  })

  const { data: news } = await supabase.from('news').select()

  return (
    <main className={styles.main}>
      <NavBar />
      <h1>HOME</h1>
      {news?.map(singleNews => (
        <div key={singleNews.id}>
          {/* <h2>{singleNews.title}</h2>
          <h3>{singleNews.ingress}</h3>
          <p>{singleNews.body_text}</p> */}
        </div>
      ))}
    </main>
  )
}
