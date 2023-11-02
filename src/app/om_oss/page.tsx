import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabasServer from '../../lib/supabaseServer'

const { supabase } = useSupabasServer()

const page = async () => {
  const { data: aboutPage, error } = await supabase
    .from('about_page')
    .select(`about_association (*), instructors (*), our_philosophy (*)`)

  if (error) {
    console.log(error)
  }

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
            <div key={instructor.instructors?.id}>
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
