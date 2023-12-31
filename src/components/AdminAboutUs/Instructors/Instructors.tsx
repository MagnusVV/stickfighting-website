'use client'
import { useEffect, useState } from 'react'
import styles from './Instructors.module.css'
import { InstructorCollection } from '@/lib/types'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useSupabaseClient from '@/lib/supabaseClient'
import EditInstructor from './EditInstructor'
import Button from '@/components/Button/Button'
import { genericButton } from '@/components/Button/assortedButtons'

interface InstructorsProps {
  instructors: InstructorCollection
}

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  const [instructorsFetch, setInstructorsFetch] = useState<JSONContent>([])
  const [isReady, setIsReady] = useState<boolean>(false)
  const [instructorText, setInstructorText] = useState<JSONContent>()
  const [instructorId, setInstructorId] = useState<number>(0)
  const [editInstructor, setEditInstructor] = useState<boolean>(false)
  // Get supabase connection and user id from import. -MV
  const { supabase, userId } = useSupabaseClient()

  // NEW FETCH ------------------------------->
  useEffect(() => {
    const fetchInstructors = async () => {
      const { data, error } = await supabase.from('instructors').select('*')

      if (error) {
        console.log(error)
        return
      }

      if (data && data.length > 0) {
        setInstructorsFetch(data)
      }
    }
    fetchInstructors()
  }, [])

  //---------------------------------------------->

  //create custom component to update the editor instance in the loop
  const InstructorEditor = ({ content }: any) => {
    const editor = useEditor({
      content: content,
      extensions: [StarterKit],
      onCreate: () => {
        setIsReady(true)
      },
      onUpdate: ({ editor }) => {
        const instructorJson = editor.getJSON()
        // //@ts-ignore //TODO: fix ts ignore
        setInstructorText(instructorJson.body_text)
      },
    })

    return <EditorContent editor={editor} />
  }

  const menuEditor = useEditor({
    content: '',
    extensions: [StarterKit],
  })

  return (
    <div>
      <h2>Instruktörer</h2>
      <div className={styles.wrapper}>
        {editInstructor && (
          <EditInstructor
            instructorId={instructorId}
            setEditInstructor={setEditInstructor}
          />
        )}
        {instructorsFetch.map((instructor: any, index: number) => {
          const valueToUpdate = instructorsFetch.find(
            (value: { id: number; name: string }) => value.id === instructor.id,
          )
          return (
            <div key={index}>
              <input
                className={styles.input}
                name={`instructor_${instructor.name}_name`}
                placeholder="lorem ipsum"
                defaultValue={valueToUpdate?.name}
                readOnly
              ></input>
              <MenuBar editor={menuEditor} />
              <InstructorEditor content={instructor.body_text} />
              <Button
                text="Uppdatera"
                styling={genericButton}
                onClickEvent={() => {
                  setEditInstructor(true), setInstructorId(instructor.id)
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Instructors
