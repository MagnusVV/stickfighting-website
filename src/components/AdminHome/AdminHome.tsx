'use client'
import React from 'react'
import styles from './AdminHome.module.css'
import AdminNews from '../AdminNews/AdminNews'

const AdminHome = () => {
  return (
    <div className={styles.wrapper}>
      <h1>AdminHome</h1>
      <AdminNews />
    </div>
  )
}

export default AdminHome
