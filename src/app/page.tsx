import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import useSupabaseServer from '@/lib/supabaseServer'

export default async function Home() {
  const { supabase } = useSupabaseServer()

  const { data: news } = await supabase.from('news').select()

  // TODO: Move this to own componenet? -MV
  const WelcomeVideo = () => {
    const {
      data: { publicUrl },
    } = supabase.storage.from('video').getPublicUrl('welcome/welcome_video')

    return (
      <div className={styles.videoContainer}>
        <video /* autoPlay */ muted loop className={styles.video}>
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
      {news?.map(singleNews => (
        <div key={singleNews.id}>
          {/* <h2>{singleNews.title}</h2>
          <h3>{singleNews.ingress}</h3>
          <p>{singleNews.body_text}</p> */}
        </div>
      ))}
    </main>
  )
}
