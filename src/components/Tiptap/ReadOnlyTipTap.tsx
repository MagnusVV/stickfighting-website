import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'
import { marks } from '@tiptap/pm/schema-basic'

const ReadOnlyTipTap = () => {
  const [editable, setEditable] = useState(false)
  const [testText, setTestText] = useState<string>('')
  const [jsonData, setJsonData] = useState<Json>()
  const { supabase, userId } = useSupabaseClient()

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('editor_test')
      .select('body_text')
      .eq('id', 1)

    if (error) {
      return error
    }

    if (data) {
      console.log(data)
      //   setJsonData(data[0])
      //TODO: Remove TS-ignore (just can't be fucking bothered right now)
      //@ts-ignore
      editor.commands.setContent({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                //@ts-ignore //FIXME: remove TS-ignore
                type: `${data[0]?.body_text.text.content[0].type}`,
                //@ts-ignore //FIXME: remove TS-ignore
                text: `${data[0]?.body_text.text.content[0].text}`,
                //@ts-ignore
                //make the marks parameter optional incease it is empty
                ...(data[0]?.body_text.text.content[0]?.marks && {
                  marks: [
                    {
                      //@ts-ignore //FIXME: remove TS-ignore
                      type: `${data[0]?.body_text.text.content[0]?.marks[0].type}`,
                    },
                  ],
                }),
              },
            ],
          },
        ],
      })
    }

    console.log(jsonData)
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
      <button onClick={fetchContent}>Fetch Content</button>
    </>
  )
}

export default ReadOnlyTipTap
