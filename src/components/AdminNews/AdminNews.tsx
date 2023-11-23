'use client'
import { useState, useEffect } from 'react'
import styles from './AdminNews.module.css'
import EditNews from './EditNews/EditNews'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'
import Button from '../Button/Button'
import { genericButton, genericButtonMargin } from '../Button/assortedButtons'

export interface newsFetch {
  id: number
  title: string
  ingress: string
  body_text: Json
  created_at: string
  profile_id: string
}
export type newsParams = newsFetch[]

const AdminNews = () => {
  const [newsTitle, setNewsTitle] = useState<string>('')
  const [newNews, setNewNews] = useState<JSONContent | string>()
  const [ingress, setIngress] = useState<string>('')
  //FIXME: Change the any type
  const [newsArticles, setNewsArticles] = useState<any[]>([])
  const [editNews, setEditNews] = useState<boolean>(false)
  const [newsId, setNewsId] = useState<number>(0)

  const { supabase, userId } = useSupabaseClient()

  //fetch news
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.log(error)
        return
      }

      if (data && data.length > 0) {
        setNewsArticles(data)
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
      profile_id: userId,
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

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const jsonNews = editor.getJSON()
      setNewNews(jsonNews)
    },
  })

  // Create custom component to be able to update editor and set the content in the map function.
  //  If I try this in the map function it breaks the rules of hooks.
  const ArticleEditor = ({ content }: any) => {
    const editor = useEditor({
      content: content,
      extensions: [StarterKit],
    })
    return <EditorContent editor={editor} />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.addNewsSection}>
        <form onSubmit={handleInsert} className={styles.form}>
          <h2>Lägg till nyhet</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="titel"
            onChange={e => setNewsTitle(e.target.value)}
            value={newsTitle}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="ingress"
            onChange={e => setIngress(e.target.value)}
            value={ingress}
          />
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          <Button
            text="Lägg till nyhet"
            styling={genericButton}
            type="submit"
          />
        </form>
      </div>
      {editNews && (
        <EditNews
          newsId={newsId}
          newsArticle={newsArticles}
          setEditNews={setEditNews}
        />
      )}
      <div>
        <h2>Redigera nyheter</h2>
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
                {/* return the component to update editor content properly */}
                {/* TODO: Make them non editable */}
                <ArticleEditor content={article.body_text} />
                <p>{article.created_at.slice(0, 10)}</p>
                <Button
                  text="Redigera"
                  type="button"
                  styling={genericButtonMargin}
                  onClickEvent={() => {
                    setNewsId(article.id), setEditNews(true)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminNews
