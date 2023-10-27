import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import fetchObj from '@/lib/types'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './AdminNews.module.css'
import { title } from 'process'

interface newsFetch {
  id: number
  title: string
  ingress: string
  body_text: string
  created_at: string
  profile_id: string
}
type newsParams = newsFetch[]

const AdminNews = () => {
  const [newsTitle, setNewsTitle] = useState<string>('')
  const [newNews, setNewNews] = useState<string>('')
  const [ingress, setIngress] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [newsArticles, setNewsArticles] = useState<fetchObj[]>([])
  const supabase = createClientComponentClient<Database>()

  //fetch the active session
  useEffect(() => {
    const fetchUserID = async () => {
      const cookie = await supabase.auth.getSession()
      const user = cookie.data.session
      //set the session as a state
      setSessionId(user?.user.id as string)
    }

    fetchUserID()
  }, [])

  //fetch news
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase.from('news').select('*')

      if (error) {
        console.log(error)
      }

      if (data) {
        // console.log(data)
        setNewsArticles(data as newsParams)
      }
    }

    fetchNews()
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

    alert('Nyhet tillagd')
    setNewsTitle('')
    setIngress('')
    setNewNews('')
  }

  // console.log(newsArticles)

  return (
    <div className={styles.wrapper}>
      <h1>Nyheter</h1>
      <div>
        <h3>redigera nyheter</h3>
        <div className={styles.newscarousel}>
          {newsArticles.map((article, id) => {
            return (
              <div className={styles.article} key={id}>
                <h3>{article.title}</h3>
                <p>{article.body_text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h3>Ny nyhet</h3>
        <form onSubmit={handleInsert} className={styles.form}>
          <input
            type="text"
            placeholder="titel"
            onChange={e => setNewsTitle(e.target.value)}
            value={newsTitle}
          />
          <input
            type="text"
            placeholder="ingress"
            onChange={e => setIngress(e.target.value)}
            value={ingress}
          />
          <textarea
            name="about-us-text"
            cols={30}
            rows={10}
            placeholder="en ny spännande nyhet"
            onChange={e => setNewNews(e.target.value)}
            value={newNews}
          ></textarea>
          <button type="submit">Lägg till nyhet</button>
        </form>
      </div>
    </div>
  )
}

export default AdminNews
