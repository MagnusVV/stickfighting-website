import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import fetchObj from '@/lib/types'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './AdminNews.module.css'

const AdminNews = () => {
  const [newsTitle, setNewsTitle] = useState<string>('')
  const [newNews, setNewNews] = useState<string>('')
  const [ingress, setIngress] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    //fetch the active session
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      //set the session as a state
      setSessionId(user?.user.id as string)
    }

    fetchUserID()
  }, [])

  const handleInsert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.from('news').insert({
      title: newsTitle,
      ingress: ingress,
      body_text: newNews,
      profile_id: sessionId,
    })

    if (error) {
      console.log(error)
    }

    console.log(sessionId)
  }

  return (
    <div className={styles.wrapper}>
      <h1>Nyheter</h1>
      <div>
        <h3>redigera nyheter</h3>
        <div className={styles.newscarousel}></div>
      </div>
      <div>
        <h3>Ny nyhet</h3>
        <form onSubmit={handleInsert} className={styles.form}>
          <input
            type="text"
            placeholder="titel"
            onChange={e => setNewsTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="ingress"
            onChange={e => setIngress(e.target.value)}
          />
          <textarea
            name="about-us-text"
            cols={30}
            rows={10}
            placeholder="en ny spännande nyhet"
            onChange={e => setNewNews(e.target.value)}
          ></textarea>
          <button type="submit">Lägg till nyhet</button>
        </form>
      </div>
    </div>
  )
}

export default AdminNews
