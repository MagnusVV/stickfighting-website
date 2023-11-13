import AboutUsText from '@/components/AdminAboutUs/OurPhilosophy/OurPhilosophy'
import styles from '../page.module.css'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn'
import NavBar from '@/components/NavBar/NavBar'
import AdminAboutUs from '@/components/AdminAboutUs/AdminAboutUs'
import AdminHome from '@/components/AdminHome/AdminHome'
import adminStyles from './admin.module.css'
import Tiptap from '@/components/Tiptap/Tiptap'

const AdminPage = () => {
  return (
    <main className={`${styles.main} ${adminStyles.wrapper}`}>
      <NavBar />
      <h1>Welcome Admin</h1>
      <AdminAboutUs />
      <AdminHome />
      <LogoutBtn />
      {/* <Tiptap /> */}
    </main>
  )
}

export default AdminPage
