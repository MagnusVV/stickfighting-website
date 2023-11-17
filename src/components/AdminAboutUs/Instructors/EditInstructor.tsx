import { useState, useEffect } from 'react'
import Styles from './EditInstructor.module.css'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import useSupabaseClient from '@/lib/supabaseClient'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import StarterKit from '@tiptap/starter-kit'
import { Json } from '@/lib/codeBlockSupabase'

interface instructorProp {
  instructorId: number
  setEditInstructor: (editInstructor: boolean) => void
}

const EditInstructor: React.FC<instructorProp> = ({
  instructorId,
  setEditInstructor,
}) => {
  const { supabase, userId } = useSupabaseClient()
  const [instructorReady, setInstructorReady] = useState<boolean>(false)

  // fetch data
  useEffect(() => {
    if (instructorReady === true) {
      const fetchSingleInstructor = async () => {
        const { data, error } = await supabase.from('instructors').select('*')

        if (error) {
          console.log(error)
          return
        }

        if (data) {
          console.log(data)
          const singleInstructor = data.find(
            instructor => instructor.id === instructorId,
          )
          console.log('singleInstructor ', singleInstructor)
          editor?.commands.setContent(singleInstructor?.body_text)
        }
      }
      fetchSingleInstructor()
    } else {
      console.log('editor aint ready fam')
    }
  }, [instructorReady])

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onCreate: () => {
      setInstructorReady(true)
    },
    // onUpdate: ({ editor }) => {
    //   const updateJson = editor.getJSON()
    //   setBodyText(updateJson)
    // },
  })
  return (
    <div className={Styles.wrapper}>
      <button
        onClick={() => {
          setEditInstructor(false)
        }}
      >
        Close
      </button>
      <form className={Styles.form}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </form>
      <h1>EditInstructor</h1>
    </div>
  )
}

export default EditInstructor
