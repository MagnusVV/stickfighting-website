// TODO: This page should be dynamic, and not place in the ordinary page structure.

import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'

const page = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1>NYHET</h1>
    </main>
  )
}

export default page