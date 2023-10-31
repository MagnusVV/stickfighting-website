'use client'
import { SetStateAction, useEffect, useState } from 'react'
import styles from './EditNews.module.css'
import { newsFetch } from '../AdminNews/AdminNews'
import fetchObj from '@/lib/types'

interface newsProps {
  newsId: number
  newsArticle: newsFetch[]
  setEditNews: (editNews: boolean) => void
}

interface editNewsParams {
  id: number
  title: string
  ingress: string
  body_text: string
  created_at: string
  profile_id: string
}

const EditNews: React.FC<newsProps> = ({
  newsId,
  newsArticle,
  setEditNews,
}) => {
  const [title, setTitle] = useState<editNewsParams | string>()
  const [ingress, setIngress] = useState<editNewsParams | string>()
  const [bodyText, setBodyText] = useState<editNewsParams | string>()
  //Find the newsArticle with the id that matches the state I receive from the parent
  const importedNews = newsArticle.find(article => article.id === newsId)

  useEffect(() => {
    //set the states
    setTitle(importedNews?.title)
    setIngress(importedNews?.ingress)
    setBodyText(importedNews?.body_text)
  }, [importedNews])

  //TODO: fix warning message about uncontrollable input
  return (
    <div className={styles.wrapper}>
      <button onClick={() => setEditNews(false)}>CLOSE</button>
      <h1>Redigera nyheter</h1>
      <form className={styles.form} action="submit">
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
          onChange={e => setIngress(ingress)}
          placeholder={importedNews?.ingress}
          value={ingress?.toString()}
        />
        <textarea
          name="body_text"
          cols={30}
          rows={10}
          onChange={e => setBodyText(bodyText)}
          placeholder={importedNews?.body_text}
          value={bodyText?.toString()}
        ></textarea>
      </form>
    </div>
  )
}

export default EditNews
