'use client'
import { SetStateAction, useEffect, useState } from 'react'
import styles from './EditNews.module.css'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import useSupabaseClient from '@/lib/supabaseClient'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import StarterKit from '@tiptap/starter-kit'
import { Json } from '@/lib/codeBlockSupabase'

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
      <button onClick={() => setEditNews(false)}>CLOSE</button>
      <h1>Redigera nyheter</h1>
      <form
        className={styles.form}
        onSubmit={submitNews}
        id="editNewsForm"
        name="editNewsForm"
      >
        <label htmlFor="title">titel</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder={title}
        />
        <label htmlFor="ingress">Ingress</label>
        <input
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
        <button type="submit">Updatera</button>
      </form>
    </div>
  )
}

export default EditNews
