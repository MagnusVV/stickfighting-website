'use client'

import '../../app/globals.css'
import ListItem from '@tiptap/extension-list-item'
import { EditorProvider, JSONContent, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { ReactNode, useEffect, useState } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="tiptapMenuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
    </div>
  )
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

const TipTap = () => {
  const [text, setText] = useState<Json>()
  const [fetchData, setFetchData] = useState<Json>()

  const readableText = JSON.stringify(text)

  //fetch the content
  useEffect(() => {
    const fetchTestData = async () => {
      const { data, error } = await supabase
        .from('editor_test')
        .select('body_text')

      if (error) {
        return console.log(error)
      }

      if (data) {
        setFetchData(data)
      }
    }

    fetchTestData()
  }, [])

  console.log(fetchData)

  //fetch supabse cli connection, and the session id
  const { supabase, userId } = useSupabaseClient()

  const edidorUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // //convert string to json
    // let txt = `${text}`

    // //convert from single quote to double quote for JSON to work
    // txt = txt.replaceAll("'", '"')
    //parse the object

    //update it to supabase
    const { error } = await supabase
      .from('editor_test')
      .upsert({ id: 1, body_text: { text }, profile_id: userId })
      .select()

    if (error) {
      console.log(error)
      return error
    }

    alert('update successful')
  }

  const content = text
  return (
    <>
      <form action="submit" onSubmit={edidorUpdate}>
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
          onUpdate={({ editor }) => {
            const jsonObj = editor.getJSON()

            const jsonArr = jsonObj.content
            jsonArr?.map(test => {
              setText(test)
            })
          }}
        ></EditorProvider>
        <button type="submit">insert</button>
      </form>
    </>
  )
}

export default TipTap
