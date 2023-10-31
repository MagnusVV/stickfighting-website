'use client'
import { useState, useEffect } from 'react'
import styles from './AdminHome.module.css'
import AdminNews from '../AdminNews/AdminNews'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'

const supabase = createClientComponentClient<Database>()

const AdminHome = () => {
  return (
    <div className={styles.wrapper}>
      <h1>AdminHome</h1>
      <AdminNews />
    </div>
  )
}

export default AdminHome
