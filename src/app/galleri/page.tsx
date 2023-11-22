'use client'
import Gallery from '@/components/Gallery/Gallery'
import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import PageTitle from '@/components/PageTitle/PageTitle'

const page = () => {
  return (
    <main className={styles.main}>
      <PageTitle pageTitle="Bildgalleri" />
      <NavBar hamburgerColor="white" />
      <Gallery />
    </main>
  )
}

export default page
