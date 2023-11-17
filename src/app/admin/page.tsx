import AboutUsText from '@/components/AdminAboutUs/OurPhilosophy/OurPhilosophy'
import styles from '../page.module.css'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn'
import NavBar from '@/components/NavBar/NavBar'
import AdminAboutUs from '@/components/AdminAboutUs/AdminAboutUs'
import AdminHome from '@/components/AdminHome/AdminHome'
import adminStyles from './admin.module.css'
import AdminCalendar from '@/components/AdminCalendar/AdminCalendar'
import Tiptap from '@/components/Tiptap/Tiptap'
import AdminImageGallery from '@/components/AdminImageGallery/AdminImageGallery'

const AdminPage = () => {
  return (
    <main className={`${styles.main} ${adminStyles.wrapper}`}>
      <NavBar />
      <h1>Welcome Admin</h1>
      <AdminHome />
      <AdminCalendar />
      <AdminAboutUs />
      <AdminImageGallery />
      <LogoutBtn />
      {/* <Tiptap /> */}
    </main>
  )
}

export default AdminPage
