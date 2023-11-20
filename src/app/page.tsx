import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '@/lib/supabaseServer'

import HomeNews from '@/components/homeNews/HomeNews'

export default async function Home() {
  const { supabase } = useSupabaseServer()

  // TODO: Move this to own componenet? -MV
  const WelcomeVideo = () => {
    const {
      data: { publicUrl },
    } = supabase.storage.from('video').getPublicUrl('welcome/welcome_video')

    return (
      <div className={styles.videoContainer}>
        <video autoPlay muted loop className={styles.video}>
          <source src={publicUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <WelcomeVideo />
      <h1>HOME</h1>
      <section className={styles.newsSection}>
        <h2>Nyheter</h2>
        <div>
          <HomeNews />
        </div>
      </section>
    </main>
  )
}
