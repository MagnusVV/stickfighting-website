import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '../../lib/supabaseServer'
// Tiptap imports
import AboutUsSection from '@/components/aboutUsSection/AboutusSection'
import OurPhilosophy from '@/components/OurPhilosophy/OurPhilosophy'
import InstructorSection from '@/components/InstructorSection/InstructorSection'
import PageTitle from '@/components/PageTitle/PageTitle'

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
      <PageTitle pageTitle="Om oss" />
      <NavBar hamburgerColor="white" />
      {/* "Om föreningen" section */}
      <section className={styles.section}>
        <AboutUsSection />
      </section>
      {/* "Våra instruktörer" section */}
      <section className={styles.section}>
        <InstructorSection />
      </section>
      {/* "Vår filosofi" section */}
      <section className={styles.section}>
        <OurPhilosophy />
      </section>
      {/* Dynamic sections */}
      {/* some check to see if array contains anything */}
      <section className={styles.section}></section>
    </main>
  )
}

export default Page
