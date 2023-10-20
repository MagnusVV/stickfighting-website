import AboutUsText from '@/components/AboutUsText/AboutUsText'
import styles from '../page.module.css'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn'
import NavBar from '@/components/NavBar/NavBar'

const AdminPage = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1>Welcome Admin</h1>
      <AboutUsText />
      <LogoutBtn />
    </main>
  )
}

export default AdminPage
