import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '../../lib/supabaseServer'
// Tiptap imports
import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'
import AboutUsSection from '@/components/aboutUsSection/AboutusSection'
import OurPhilosophy from '@/components/OurPhilosophy/OurPhilosophy'
import InstructorSection from '@/components/InstructorSection/InstructorSection'

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
      <section className={styles.section}>
        <AboutUsSection />
      </section>
      {/* "Våra instruktörer" section */}
      <section className={styles.section}>
        <h2>Våra instruktörer</h2>
        <InstructorSection />
      </section>
      {/* "Vår filosofi" section */}
      <section className={styles.section}>
        <OurPhilosophy />
      </section>
      <div></div>
    </main>
  )
}

export default Page
