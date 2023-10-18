import Image from 'next/image'
import styles from './page.module.css'
import NavBar from '@/components/NavBar/NavBar'

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1>HOME</h1>
    </main>
  )
}
