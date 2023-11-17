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
  const [instructorReady, setInstructorReady] = useState<boolean>(false)
  const [instructorInfo, setInstructorInfo] = useState<JSONContent | Json>()
  const [instructorName, setInstructorName] = useState<string>()
  const { supabase, userId } = useSupabaseClient()

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
          //Find the id of the instructor that was selected in instructors.tsx
          const singleInstructor = data.find(
            instructor => instructor.id === instructorId,
          )
          console.log('singleInstructor ', singleInstructor)
          editor?.commands.setContent(singleInstructor?.body_text)
          //@ts-ignore //TODO: fix ts-ignore
          setInstructorName(singleInstructor?.name)
        }
      }
      fetchSingleInstructor()
    } else {
      console.log('editor has not mounted properly yet')
    }
  }, [instructorReady])

  //Update instructor
  const submitInstructor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase
      .from('instructors')
      .update({
        // title: title,
        // ingress: ingress,
        body_text: instructorInfo,
      })
      .match({ id: instructorId, profile_id: userId })

    if (error) {
      return console.log(error)
    }

    alert('Nyhet uppdaterad')
    setEditInstructor(false)
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    onCreate: () => {
      setInstructorReady(true)
    },
    onUpdate: ({ editor }) => {
      const updateInstructorJson = editor.getJSON()
      setInstructorInfo(updateInstructorJson)
    },
  })

  console.log('updateInstructorInfo', instructorInfo)

  return (
    <div className={Styles.wrapper}>
      <button
        onClick={() => {
          setEditInstructor(false)
        }}
      >
        Close
      </button>
      <h1>EditInstructor</h1>
      <form className={Styles.form} onSubmit={submitInstructor}>
        <input
          id="title"
          name="title"
          type="text"
          onChange={e => setInstructorName(e.target.value)}
          value={instructorName}
        />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <button type="submit">Updatera Instruktör</button>
      </form>
    </div>
  )
}

export default EditInstructor
