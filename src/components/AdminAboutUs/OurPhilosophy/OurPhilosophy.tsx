'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Database } from '@/lib/codeBlockSupabase'
import styles from './OurPhilosophy.module.css'
import { fetchObj } from '@/lib/types'
import useSupabaseClient from '@/lib/supabaseClient'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { JSONContent } from '@tiptap/react'
import Button from '@/components/Button/Button'
import { genericButton } from '@/components/Button/assortedButtons'

interface OurPhilosophyProps {
  philosophy: fetchObj
  setPhilosophy: React.Dispatch<React.SetStateAction<fetchObj | undefined>>
}

//old component
// const OurPhilosophy: React.FC<OurPhilosophyProps> = ({
//   philosophy,
//   setPhilosophy,
// }) => {

const OurPhilosophy = () => {
  const { supabase, userId } = useSupabaseClient()
  const [philosophy, setPhilosophy] = useState<JSONContent>()

  useEffect(() => {
    const fetchPhilosophy = async () => {
      const { data, error } = await supabase
        .from('our_philosophy')
        .select('body_text')
        .eq('id', 2)

      if (error) {
        console.log(error)
        return
      }

      if (data && data.length > 0) {
        //@ts-ignore //FIXME: throwing an error when building
        editor?.commands.setContent(data[0].body_text)
      }
    }
    fetchPhilosophy()
  }, [userId])

  const updatePhilosophy = async () => {
    //make update call to supabase
    const { data, error } = await supabase
      .from('our_philosophy')
      //update with the text from the form
      .update({ body_text: philosophy })
      .match({ id: 2, profile_id: userId })

    if (error) {
      console.log(error)

      alert('Filosofi uppdaterad')
    }
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const jsonPhilosophy = editor.getJSON()
      setPhilosophy(jsonPhilosophy)
    },
  })

  return (
    <div className={styles.wrapper}>
      <h2>Vår filosofi</h2>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/* <button onClick={fetchPhilosophy}>fetch philosophy</button> */}
      <Button
        text="Uppdatera"
        styling={genericButton}
        onClickEvent={updatePhilosophy}
      />
    </div>
  )
}

export default OurPhilosophy
