'use client'
import { SetStateAction, useEffect, useState } from 'react'
import styles from './EditNews.module.css'
import { newsFetch } from '../AdminNews/AdminNews'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'

interface newsProps {
  newsId: number
  newsArticle: newsFetch[]
  setEditNews: (editNews: boolean) => void
}

const EditNews: React.FC<newsProps> = ({
  newsId,
  newsArticle,
  setEditNews,
}) => {
  const [title, setTitle] = useState<string>()
  const [ingress, setIngress] = useState<string>()
  const [bodyText, setBodyText] = useState<string>()
  const [sessionId, setSessionId] = useState<string>('')

  const supabase = createClientComponentClient<Database>()
  //Find the newsArticle with the id that matches the state I receive from the parent
  const importedNews = newsArticle.find(article => article.id === newsId)

  useEffect(() => {
    //set the states
    setTitle(importedNews?.title as string)
    setIngress(importedNews?.ingress as string)
    setBodyText(importedNews?.body_text as string)
  }, [importedNews])

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

  //add the update to supabase
  const submitNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase
      .from('news')
      .update({
        title: title,
        ingress: ingress,
        body_text: bodyText,
      })
      .match({ id: newsId, profile_id: sessionId })

    if (error) {
      return console.log(error)
    }

    alert('Nyheter updaterade')
    setEditNews(false)
  }

  //TODO: fix warning message about uncontrollable input
  return (
    <div className={styles.wrapper}>
      <button onClick={() => setEditNews(false)}>CLOSE</button>
      <h1>Redigera nyheter</h1>
      <form className={styles.form} onSubmit={submitNews}>
        <label htmlFor="title">titel</label>
        <input
          name="title"
          type="text"
          onChange={e => setTitle(e.target.value)}
          placeholder={importedNews?.title}
          value={title?.toString()}
        />
        <label htmlFor="ingress">Ingress</label>
        <input
          name="ingress"
          type="text"
          onChange={e => setIngress(e.target.value)}
          placeholder={importedNews?.ingress}
          value={ingress?.toString()}
        />
        <textarea
          name="body_text"
          cols={30}
          rows={10}
          onChange={e => setBodyText(e.target.value)}
          placeholder={importedNews?.body_text}
          value={bodyText?.toString()}
        ></textarea>
        <button type="submit">Updatera</button>
      </form>
      <p>{title}</p>
      <p>{ingress}</p>
      <p>{bodyText}</p>
    </div>
  )
}

export default EditNews
