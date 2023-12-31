'use client'
import { SetStateAction, useEffect, useState } from 'react'
import styles from './EditNews.module.css'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import useSupabaseClient from '@/lib/supabaseClient'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import StarterKit from '@tiptap/starter-kit'
import { Json } from '@/lib/codeBlockSupabase'
import Button from '@/components/Button/Button'
import { genericButton } from '@/components/Button/assortedButtons'

interface newsProps {
  newsId: number
  newsArticle: JSONContent[]
  setEditNews: (editNews: boolean) => void
}

const EditNews: React.FC<newsProps> = ({
  newsId,
  newsArticle,
  setEditNews,
}) => {
  const [title, setTitle] = useState<string>('')
  const [ingress, setIngress] = useState<string>('')
  const [bodyText, setBodyText] = useState<JSONContent>()
  const [ready, setReady] = useState<boolean>(false)

  const { supabase, userId } = useSupabaseClient()
  //Find the newsArticle with the id that matches the state I receive from the parent
  const importedNews = newsArticle.find(article => article.id === newsId)

  useEffect(() => {
    //set the states
    setTitle(importedNews?.title as string)
    setIngress(importedNews?.ingress as string)
  }, [importedNews])

  //TODO: Sometimes it takes a second for the content to load from supabase.
  //SOLUION: add loading state to indicate for user something is happening...
  useEffect(() => {
    if (ready === true) {
      const fetchSingleNews = async () => {
        const { data, error } = await supabase.from('news').select('*')

        if (error) {
          console.log(error)
          return
        }

        if (data && data.length > 0) {
          // console.log('news ', data)
          const singleNews = data.find(news => news.id === newsId)
          console.log('singleNews ', singleNews?.body_text)
          //@ts-ignore Vercel deployment fails otherwise
          editor?.commands.setContent(singleNews?.body_text)
        }
      }
      fetchSingleNews()
    }
  }, [ready])

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
      .match({ id: newsId, profile_id: userId })

    if (error) {
      return console.log(error)
    }

    alert('Nyhet uppdaterad')
    setEditNews(false)
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onCreate: () => {
      setReady(true)
    },
    onUpdate: ({ editor }) => {
      const updateJson = editor.getJSON()
      setBodyText(updateJson)
    },
  })

  return (
    <div className={styles.wrapper}>
      <Button
        styling={genericButton}
        text="Stäng"
        onClickEvent={() => setEditNews(false)}
      />
      <h2>Redigera nyheter</h2>
      <form
        className={styles.form}
        onSubmit={submitNews}
        id="editNewsForm"
        name="editNewsForm"
      >
        <label htmlFor="title">titel</label>
        <input
          className={styles.input}
          id="title"
          name="title"
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder={title}
        />
        <label htmlFor="ingress">Ingress</label>
        <input
          className={styles.input}
          id="ingress"
          name="ingress"
          type="text"
          onChange={e => setIngress(e.target.value)}
          value={ingress}
          placeholder={ingress}
        />
        <label htmlFor="body_text">Text</label>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <Button text="Uppdatera" styling={genericButton} type="submit" />
      </form>
    </div>
  )
}

export default EditNews
