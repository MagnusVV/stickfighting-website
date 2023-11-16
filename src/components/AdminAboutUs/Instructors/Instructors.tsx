'use client'
import { useEffect, useState } from 'react'
import styles from './Instructors.module.css'
import { InstructorCollection, InstructorParams } from '@/lib/types'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'

interface InstructorsProps {
  instructors: InstructorCollection
}

interface jsonText {
  body_text: JSONContent
}

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  const [isReady, setIsReady] = useState<boolean>(false)
  // Get supabase connection and user id from import. -MV
  const { supabase, userId } = useSupabaseClient()

  // This state updates with every single key-input in the forms -MV
  const [instructorValues, setInstructorValues] = useState(instructors)
  // console.log('instructor values ', instructorValues)

  //check wether the editor is ready before updating its data.
  // useEffect(() => {
  //   if (isReady == true) {
  //     editor?.commands.setContent(instructorValues)
  //     console.log('yes')
  //   } else {
  //     console.log('Instructors aint ready fam')
  //   }
  // }, [isReady])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Adding userId to "instructorValues" -MV
    const authInstructorValues = instructorValues.map(instructorValue => ({
      ...instructorValue,
      profile_id: userId,
    }))

    // Update call to supabase -MV
    const { data, error } = await supabase
      .from('instructors')
      // Update with text from form -MV
      .upsert(authInstructorValues)

    if (error) {
      console.log(error)
    }

    if (!error) {
      alert('Information uppdaterad!')
    }
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    // onUpdate: ({ editor }) => {
    //   const jsonNews = editor.getJSON()
    //   setNewNews(jsonNews)
    // },
  })

  //create custom component to update the editor instance in the loop
  const InstructorEditor = ({ content }: any) => {
    const editor = useEditor({
      content: content,
      extensions: [StarterKit],
      onCreate: () => {
        setIsReady(true)
      },
    })
    return <EditorContent editor={editor} />
  }

  const menuEditor = useEditor({
    content: '',
    extensions: [StarterKit],
  })

  console.log('isReady', isReady)

  return (
    <div className={styles.wrapper}>
      <h2>Våra instruktörer</h2>
      {instructors.map(instructor => {
        // Since you shouldn't mutate states, we save the changes here before updating the state -MV
        const updatedInstructorValues = [...instructorValues]
        // console.log('instructors ', updatedInstructorValues)

        // Finds the specifc part of "instructorValues" state that will be updated -MV
        const valueToUpdate = updatedInstructorValues.find(
          value => value.id === instructor.id,
        )

        // TODO: Add Rich Text formatting, or similar? -MV

        return (
          <div key={instructor.id}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Instructor name */}
              {/* <textarea
                className={styles.textarea}
                name={`instructor_${instructor.name}_name`}
                cols={30}
                rows={1}
                placeholder="lorem ipsum"
                onChange={e => {
                  if (valueToUpdate) {
                    valueToUpdate.name = e.target.value
                    setInstructorValues(updatedInstructorValues)
                  }
                }}
                value={valueToUpdate?.name}
              ></textarea> */}
              {/* Instructor facts */}
              {/* <textarea
                className={styles.textarea}
                name={`instructor_${instructor.name}_information`}
                cols={30}
                rows={10}
                placeholder="lorem ipsum"
                onChange={e => {
                  if (valueToUpdate) {
                    valueToUpdate.body_text = e.target.value
                    setInstructorValues(updatedInstructorValues)
                  }
                }}
                value={valueToUpdate?.body_text}
              ></textarea> */}

              <MenuBar editor={menuEditor} />
              <InstructorEditor content={instructor.body_text} />

              <button type="submit">Uppdatera instruktör</button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default Instructors
