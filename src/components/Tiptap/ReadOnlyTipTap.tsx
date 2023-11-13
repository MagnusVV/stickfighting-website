'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'

const ReadOnlyTipTap = () => {
  const [editable, setEditable] = useState(false)
  const [testText, setTestText] = useState<string>('')
  const { supabase, userId } = useSupabaseClient()

  const fetchContent = async () => {
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
      //@ts-ignore //FIXME: throwing an error when building
      editor?.commands.setContent(data[0].body_text)
    }
  }

  const editor = useEditor({
    editable,
    content: '',
    extensions: [StarterKit],
  })

  useEffect(() => {
    if (!editor) {
      return undefined
    }

    editor.setEditable(editable)
  }, [editor, editable])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="checkbox">
        <input
          type="checkbox"
          id="editable"
          value={testText}
          onChange={event => setEditable(event.target.checked)}
        />
        <label htmlFor="editable">editable</label>
      </div>
      <EditorContent editor={editor} />
      <button onClick={fetchContent}>fetch Content</button>
    </>
  )
}

export default ReadOnlyTipTap
