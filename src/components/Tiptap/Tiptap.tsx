'use client'

import '../../app/globals.css'
import ListItem from '@tiptap/extension-list-item'
import {
  EditorProvider,
  JSONContent,
  useCurrentEditor,
  EditorContent,
  useEditor,
  FloatingMenu,
  Editor,
} from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import React, { ReactNode, useEffect, useState } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'

interface MenuBarProps {
  editor: Editor | null
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  // const { editor } = useCurrentEditor()

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
  const [text, setText] = useState<any>()
  const [fetchData, setFetchData] = useState<Json>()
  const [test, setTest] = useState<Json>()
  let newContent: any

  //fetch supabse cli connection, and the session id
  const { supabase, userId } = useSupabaseClient()

  //fetch the content

  const fetchTestData = async () => {
    const { data, error } = await supabase
      .from('editor_test')
      .select('body_text')
      .eq('id', 1)

    if (error) {
      console.log(error)
      return
    }

    if (data && data.length > 0) {
      console.log(data[0]?.body_text)

      // const tiptapData = data[0]?.body_text
      // console.log(typeof tiptapData)

      // newContent = data[0]?.body_text
      // console.log('newContent ' + newContent)
      //@ts-ignore
      // const htmlContent = editor.getHTML(data[0]?.body_text)
      // setText(data[0]?.body_text)
      editor?.commands.setContent(data[0].body_text)
      // console.log(typeof text)
    }
  }

  // let content: any

  //Update the text state
  // useEffect(() => {
  //   // console.log(text)
  //   content = `${text}`
  //   console.log('content ' + content)
  // }, [text])

  // useEffect(() => {
  //   editor?.commands.setContent(text)
  // }, [editor])

  const edidorUpdate = async () => {
    //update it to supabase
    const { error } = await supabase
      .from('editor_test')
      .upsert({ id: 1, body_text: text, profile_id: userId })
      .select()

    if (error) {
      console.log(error)
      return error
    }

    alert('update successful')
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const jsonObj = editor.getJSON()
      setText(jsonObj)
    },
  })

  return (
    <>
      {/* <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={editor}
        onUpdate={({ editor }) => {
          const jsonObj = editor.getJSON()
          setText(jsonObj)
        }}
      ></EditorProvider> */}
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <button onClick={edidorUpdate}>update</button>
      <button onClick={fetchTestData}>fetchData</button>
      {/* Detta funkar för att hämta datan, men inte för att uppdatera */}
      {/* <EditorContent editor={editor} /> */}
    </>
  )
}

export default TipTap
