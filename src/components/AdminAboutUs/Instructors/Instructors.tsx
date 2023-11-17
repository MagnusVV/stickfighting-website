'use client'
import { useEffect, useState, useRef } from 'react'
import styles from './Instructors.module.css'
import { InstructorCollection, InstructorParams } from '@/lib/types'
import { MenuBar } from '@/components/Tiptap/Tiptap'
import { EditorContent, useEditor, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useSupabaseClient from '@/lib/supabaseClient'
import { Json } from '@/lib/codeBlockSupabase'
import EditInstructor from './EditInstructor'

interface InstructorsProps {
  instructors: InstructorCollection
}

interface jsonText {
  body_text: JSONContent
}

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  const [instructorsFetch, setInstructorsFetch] = useState<JSONContent>([])
  const [isReady, setIsReady] = useState<boolean>(false)
  const [instructorText, setInstructorText] = useState<JSONContent>()
  const [instructorId, setInstructorId] = useState<number>(0)
  const [editInstructor, setEditInstructor] = useState<boolean>(false)
  // Get supabase connection and user id from import. -MV
  const { supabase, userId } = useSupabaseClient()

  // This state updates with every single key-input in the forms -MV
  const [instructorValues, setInstructorValues] = useState(instructors)
  const [updatedInstructor, setUpdatedInstructor] = useState<
    JSONContent | Json
  >()
  // console.log('instructor values ', instructorValues)

  // NEW FETCH ------------------------------->
  useEffect(() => {
    const fetchInstructors = async () => {
      const { data, error } = await supabase.from('instructors').select('*')

      if (error) {
        console.log(error)
        return
      }

      if (data && data.length > 0) {
        // console.log('instructors ', data)
        setInstructorsFetch(data)
        console.log('instructor data ', instructorsFetch)
      }
    }
    fetchInstructors()
  }, [])

  //---------------------------------------------->

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Adding userId to "instructorValues" -MV
    // const authInstructorValues = instructorValues.map(instructorValue => ({
    //   ...instructorValue,
    //   profile_id: userId,
    // }))

    // Update call to supabase -MV
    // const { data, error } = await supabase
    //   .from('instructors')
    //   // Update with text from form -MV
    //   .upsert(authInstructorValues)

    // if (error) {
    //   console.log(error)
    // }

    // if (!error) {
    //   alert('Information uppdaterad!')
    // }
    const { error } = await supabase
      .from('instructors')
      .update({ body_text: instructorValues?.body_text })
      .match({ id: instructorId, profile_id: userId })

    if (error) {
      console.log(error)
      return
    }

    alert('instruktör uppdaterad')
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit],
    // onUpdate: ({ editor }) => {
    //   const instructorJson = editor.getJSON()
    //   //@ts-ignore //TODO: fix ts ignore
    //   setInstructorValues(instructorJson)
    //   // setInstructorId(instructorId)
    // },
  })

  //create custom component to update the editor instance in the loop
  const InstructorEditor = ({ content, instructorId }: any) => {
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
        // setInstructorId(instructorId)
      },
      // onFocus: () => {
      //   setInstructorId(instructorId)
      // },
    })

    return <EditorContent editor={editor} />
  }

  console.log('instructorId ', instructorId)
  // console.log('instructorValues ', instructorValues)
  console.log('instructorText ', instructorText)

  const menuEditor = useEditor({
    content: '',
    extensions: [StarterKit],
  })

  console.log(editInstructor)

  return (
    // <div className={styles.wrapper}>
    //   <h2>Våra instruktörer</h2>
    //   {instructors.map(instructor => {
    //     // Since you shouldn't mutate states, we save the changes here before updating the state -MV
    //     const updatedInstructorValues = [...instructorValues]
    //     // console.log('instructors ', updatedInstructorValues)

    //     // Finds the specifc part of "instructorValues" state that will be updated -MV
    //     const valueToUpdate = updatedInstructorValues.find(
    //       value => value.id === instructor.id,
    //     )

    //     // TODO: Add Rich Text formatting, or similar? -MV

    //     return (
    //       <div key={instructor.id}>
    //         <form onSubmit={handleSubmit} className={styles.form}>
    //           {/* Instructor name */}
    //           <textarea
    //             className={styles.textarea}
    //             name={`instructor_${instructor.name}_name`}
    //             cols={30}
    //             rows={1}
    //             placeholder="lorem ipsum"
    //             onChange={e => {
    //               if (valueToUpdate) {
    //                 valueToUpdate.name = e.target.value
    //                 setInstructorValues(updatedInstructorValues)
    //               }
    //             }}
    //             value={valueToUpdate?.name}
    //           ></textarea>
    //           {/* Instructor facts */}
    //           {/* <textarea
    //             className={styles.textarea}
    //             name={`instructor_${instructor.name}_information`}
    //             cols={30}
    //             rows={10}
    //             placeholder="lorem ipsum"
    //             onChange={e => {
    //               if (valueToUpdate) {
    //                 valueToUpdate.body_text = e.target.value
    //                 setInstructorValues(updatedInstructorValues)
    //               }
    //             }}
    //             value={valueToUpdate?.body_text}
    //           ></textarea> */}

    //           <MenuBar editor={menuEditor} />
    //           <InstructorEditor content={instructor.body_text} />

    //           <button type="submit">Uppdatera instruktör</button>
    //         </form>
    //       </div>
    //     )
    //   })}
    // </div>
    <div className={styles.wrapper}>
      {editInstructor && (
        <EditInstructor
          instructorId={instructorId}
          setEditInstructor={setEditInstructor}
        />
      )}
      {instructorsFetch.map((instructor: any, index: number) => {
        // console.log('single instructor ', instructor)
        // const updatedInstructorValues = [...instructorValues]

        const valueToUpdate = instructorsFetch.find(
          value => value.id === instructor.id,
        )
        return (
          <div key={index}>
            <textarea
              className={styles.textarea}
              name={`instructor_${instructor.name}_name`}
              cols={30}
              rows={1}
              placeholder="lorem ipsum"
              // onChange={e => {
              //   if (valueToUpdate) {
              //     valueToUpdate.name = e.target.value
              //     setInstructorValues(updatedInstructorValues)
              //   }
              // }}
              defaultValue={valueToUpdate?.name}
            ></textarea>
            <input type="text" defaultValue={instructor.id} />
            <MenuBar editor={menuEditor} />
            <InstructorEditor
              content={instructor.body_text}
              instructorId={instructor.id}
            />
            <button
              onClick={() => {
                setEditInstructor(true), setInstructorId(instructor.id)
              }}
            >
              Updatera
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Instructors
