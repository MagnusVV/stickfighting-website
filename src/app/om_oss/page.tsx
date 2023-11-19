import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '../../lib/supabaseServer'
// Tiptap imports
import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'
import AboutUsSection from '@/components/aboutUsSection/AboutusSection'
import OurPhilosophy from '@/components/OurPhilosophy/OurPhilosophy'

const Page = async () => {
  const { supabase } = useSupabaseServer()

  const { data: aboutPage, error } = await supabase
    .from('about_page')
    .select(`about_association (*), instructors (*), our_philosophy (*)`)

  if (error) {
    console.log(error)
    return
  }

  if (aboutPage) {
    // console.log('aboutPage ', aboutPage)
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <h1>OM OSS</h1>
      {/* "Om föreningen" section */}
      <section className={styles.aboutSection}>
        <AboutUsSection />
      </section>
      {/* "Våra instruktörer" section */}
      <div>
        <h2>Våra instruktörer</h2>
        <div>
          {aboutPage?.map(instructor => (
            <div key={instructor.instructors?.id}>
              <h3>{instructor.instructors?.name}</h3>
              {/* <p>{instructor.instructors?.body_text}</p> */}
            </div>
          ))}
        </div>
      </div>
      {/* "Vår filosofi" section */}
      <section className={styles.philosophySection}>
        <OurPhilosophy />
      </section>
      <div></div>
    </main>
  )
}

export default Page
