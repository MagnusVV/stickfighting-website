'use client'
import { useState, useEffect } from 'react'
import styles from './AdminHome.module.css'
import AdminNews from '../AdminNews/AdminNews'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import ReadOnlyTipTap from '../Tiptap/ReadOnlyTipTap'
import TipTap from '../Tiptap/Tiptap'

const supabase = createClientComponentClient<Database>()

const AdminHome = () => {
  return (
    <div className={styles.wrapper}>
      <h1>AdminHome</h1>
      <AdminNews />
      <ReadOnlyTipTap />
      <TipTap />
    </div>
  )
}

export default AdminHome
