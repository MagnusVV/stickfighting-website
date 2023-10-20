import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const page = async () => {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  })

  const { data: philosophies } = await supabase.from('our_philosophy').select()

  philosophies?.map(philosophy => {
    console.log(`philosophy: ${philosophy.body_text}`)
  })

  return (
    <main className={styles.main}>
      <NavBar />
      <h1>OM OSS</h1>
      {philosophies?.map(philosophy => (
        <p>{philosophy.body_text}</p>
      ))}
    </main>
  )
}

export default page
