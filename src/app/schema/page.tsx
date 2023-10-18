import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'

const page = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1>SCHEMA</h1>
    </main>
  )
}

export default page
