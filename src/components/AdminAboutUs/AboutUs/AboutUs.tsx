'use client'
import { useEffect, useState } from 'react'
import styles from './AboutUs.module.css'
import { fetchObj } from '@/lib/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import TipTap, { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useSupabaseClient from '@/lib/supabaseClient'
import Button from '@/components/Button/Button'
import { genericButton } from '@/components/Button/assortedButtons'

interface AboutUsProps {
  about: fetchObj
  setAbout: React.Dispatch<React.SetStateAction<fetchObj | undefined>>
}

const AboutUs: React.FC<AboutUsProps> = ({ about, setAbout }) => {
  const [aboutjson, setAboutJson] = useState<JSONContent>()
  const [count, setCount] = useState<number>(0)
  const [ready, setReady] = useState<boolean>(false)
  //connect to supabase
  // const supabase = createClientComponentClient<Database>()
  const { supabase, userId } = useSupabaseClient()

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from('about_association')
        .select('body_text')
        .eq('id', 1)

      if (error) {
        console.log(error)
        return
      }

      if (data && data.length > 0) {
        console.log('about ' + data[0]?.body_text)

        //@ts-ignore //FIXME: throwing an error when building
        editor?.commands.setContent(data[0].body_text)
        setReady(true)
      }
    }
    fetchAbout()
  }, [userId])

  console.log(count)

  const updateAbout = async () => {
    const { error } = await supabase
      .from('about_association')
      .update({ body_text: aboutjson })
      //select the id from the table and the profile id
      .match({ id: 1, profile_id: userId })

    if (error) {
      console.log(error)
    }

    alert('om oss uppdaterad')
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      setAboutJson(json)
    },
  })

  return (
    <>
      {ready ? (
        <div className={styles.wrapper}>
          <h2>Om oss</h2>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          {/* <button onClick={fetchAbout}>fetch data</button> */}
          <Button
            text="Uppdatera"
            styling={genericButton}
            onClickEvent={updateAbout}
          />
        </div>
      ) : (
        <p>Loading.....</p>
      )}
    </>
  )
}

export default AboutUs
