'use client'
import { useState, useEffect, ReactNode, SetStateAction } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './AdminNews.module.css'
import EditNews from './EditNews/EditNews'

export interface newsFetch {
  id: number
  title: string
  ingress: string
  body_text: string
  created_at: string
  profile_id: string
}
export type newsParams = newsFetch[]

const AdminNews = () => {
  const [newsTitle, setNewsTitle] = useState<string>('')
  const [newNews, setNewNews] = useState<string>('')
  const [ingress, setIngress] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [newsArticles, setNewsArticles] = useState<newsParams>([])
  const [editNews, setEditNews] = useState<boolean>(false)
  const [newsId, setNewsId] = useState<number>(0)
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

  //create a new news
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
    // reset the fields after the insert is done
    setNewsTitle('')
    setIngress('')
    setNewNews('')
  }

  return (
    <div className={styles.wrapper}>
      <h1>Nyheter</h1>
      {editNews && (
        <EditNews
          newsId={newsId}
          newsArticle={newsArticles}
          setEditNews={setEditNews}
        />
      )}
      <div>
        <h3>redigera nyheter</h3>
        <div className={styles.newscarousel}>
          {newsArticles.map(article => {
            return (
              <div
                className={styles.article}
                key={article.id}
                id={article.id.toString()}
              >
                <h3>{article.title}</h3>
                <h4>{article.ingress}</h4>
                <p>{article.body_text}</p>
                {/* shorten the date message to only include the readable date info */}
                <p>{article.created_at.slice(0, 10)}</p>
                <button
                  onClick={() => {
                    setNewsId(article.id), setEditNews(true)
                  }}
                >
                  Redigera
                </button>
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
