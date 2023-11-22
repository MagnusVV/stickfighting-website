'use client'
import styles from './AdminHome.module.css'
import AdminNews from '../AdminNews/AdminNews'
import AdminHomeVideo from './AdminHomeVideo/AdminHomeVideo'

const AdminHome = () => {
  return (
    <div className={styles.wrapper}>
      <AdminHomeVideo />
      <AdminNews />
    </div>
  )
}

export default AdminHome
