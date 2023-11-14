'use client'
import Gallery from '@/components/Gallery/Gallery'
import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'

const page = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <Gallery />
    </main>
  )
}

export default page
