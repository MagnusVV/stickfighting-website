import styles from '../page.module.css'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn'
import NavBar from '@/components/NavBar/NavBar'

const page = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1>Welcome Admin</h1>
      <LogoutBtn />
    </main>
  )
}

export default page
