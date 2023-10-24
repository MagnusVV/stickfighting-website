import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import { Database } from '@/lib/codeBlockSupabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface AboutPageParams {
  aboutUsTitle: string
  aboutUsBody: string
  instructorsTitle: string
  instructorName: string
  instructorBody: string
  ourPhilosophyTitle: string
  ourPhilosophyBody: string
}

const page = async () => {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  })

  const { data: philosophies } = await supabase.from('our_philosophy').select()

  const { data: fromTwo } = await supabase.from('about_page').select(`   
      our_philosophy (*),
      about_association(id, body_text)
  `)

  fromTwo?.map(singleFromTwo =>
    console.log(singleFromTwo.our_philosophy?.created_at),
  )

  const { data: aboutPage, error } = await supabase
    .from('about_page')
    .select(`about_association (*), instructors (*), our_philosophy (*)`)

  return (
    <main className={styles.main}>
      <NavBar />
      <h1>OM OSS</h1>
      {/* "Om föreningen" section */}
      <div>
        {aboutPage && (
          <>
            <h2>{aboutPage[0].about_association?.title}</h2>
            <p>{aboutPage[0].about_association?.body_text}</p>
          </>
        )}
      </div>
      {/* "Våra instruktörer" section */}
      <div>
        <h2>Våra instruktörer</h2>
        <div>
          {aboutPage?.map(instructor => (
            <div>
              <h3>{instructor.instructors?.name}</h3>
              <p>{instructor.instructors?.body_text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* "Vår filosofi" section */}
      <div>
        {aboutPage && (
          <>
            <h2>{aboutPage[0].our_philosophy?.title}</h2>
            <p>{aboutPage[0].our_philosophy?.body_text}</p>
          </>
        )}
      </div>
    </main>
  )
}

export default page
