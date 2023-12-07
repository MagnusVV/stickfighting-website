'use client'
import { useState } from 'react'
import styles from './DynamicSection.module.css'
//tiptap imports
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { JSONContent } from '@tiptap/react'
import useSupabaseClient from '@/lib/supabaseClient'
import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'

function DynamicSection(): JSX.Element {
  const [sectionTitle, setSectionTitle] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [bodyText, setBodyText] = useState<JSONContent>()

  const { supabase, userId } = useSupabaseClient()

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const content = editor.getJSON()
      setBodyText(content)
    },
  })

  // insert dynamic component to supabase
  const insertSection = async () => {
    const { data, error } = await supabase.from('dynamic_section').insert([
      {
        section_title: 'test',
        title: 'test',
        body_text: 'test',
        profile_id: userId,
      },
    ])
    if (error) {
      console.log(error)
    }
    console.log(data)
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        name="section_title"
        type="text"
        placeholder="Dynamisk sektion titel"
        value={sectionTitle}
        onChange={e => setSectionTitle(e.target.value)}
      />
      <input
        className={styles.input}
        name="title"
        type="text"
        placeholder="titel"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <Button text="Lägg till sektion" styling={genericButton} type="button" />
    </div>
  )
}

export default DynamicSection
