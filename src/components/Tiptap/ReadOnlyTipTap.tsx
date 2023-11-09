'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState, useMemo } from 'react'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'
import { marks } from '@tiptap/pm/schema-basic'
import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { JSONContent } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'

const mySchema = {
  content: 'text*',
}

let output = ''

const ReadOnlyTipTap = () => {
  const [editable, setEditable] = useState(false)
  const [testText, setTestText] = useState<string>('')
  const [jsonData, setJsonData] = useState<JSONContent>()
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
      console.log(data)
      // const content = JSON.parse(data)
      editor?.commands.setContent(data[0].body_text)
      // if (jsonData && jsonData.lenght > 0) {
      //   output = useMemo(() => {
      //     return generateHTML(jsonData, [
      //       Document,
      //       Paragraph,
      //       Text,
      //       Bold,
      //       // other extensions …
      //     ])
      //   }, [jsonData])

      //   console.log(output)
      // }
      // console.log(data)
      // const content = data[0].body_text
      // const renderer = new Renderer()
      // const html = renderer.render(content)
      // setJsonData(html)
      // console.log(html)
      // const contentData = data[0].body_text
      // const schema = new Schema({
      //   nodes: {
      //     doc: { content: 'block+' },
      //     paragraph: { content: 'text*' },
      //     text: { inline: true },
      //   },
      // })
      // const content = Content.create(contentData, schema)
      // editor.commands.setContent(content)
      // setJsonData(contentData)
      //   setJsonData(data[0])
      //TODO: Remove TS-ignore (just can't be fucking bothered right now)
      //@ts-ignore
      // editor.commands.setContent({
      //   type: 'doc',
      //   content: [
      //     {
      //       type: 'paragraph',
      //       content: [
      //         {
      //           //@ts-ignore //FIXME: remove TS-ignore
      //           type: `${data?.body_text?.content?.map(type => {
      //             return type.type
      //           })}`,
      //           //@ts-ignore //FIXME: remove TS-ignore
      //           text: `${data?.body_text?.content?.map(text => {
      //             return text.text
      //           })}`,
      //           //@ts-ignore
      //           //make the marks parameter optional incase it is empty
      //           ...(data?.body_text?.content?.marks && {
      //             marks: [
      //               {
      //                 //@ts-ignore //FIXME: remove TS-ignore
      //                 type: `${data?.body_text?.text.content?.marks.type}`,
      //               },
      //             ],
      //           }),
      //         },
      //       ],
      //     },
      //   ],
      // })
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
      <button onClick={fetchContent}>Fetch Content</button>
      <code> {output}</code>
    </>
  )
}

export default ReadOnlyTipTap
