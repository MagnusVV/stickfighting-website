import React from 'react'
import styles from './DynamicSection.module.css'
//tiptap imports
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { JSONContent } from '@tiptap/react'

function DynamicSection(): JSX.Element {
  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {},
  })
  return (
    <div className={styles.wrapper}>
      <h2>Dynamisk section</h2>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default DynamicSection
