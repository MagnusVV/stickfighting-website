'use client'
import styles from './AdminHome.module.css'
import AdminNews from '../AdminNews/AdminNews'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/codeBlockSupabase'
import ReadOnlyTipTap from '../Tiptap/ReadOnlyTipTap'
import TipTap from '../Tiptap/Tiptap'
import AdminHomeVideo from './AdminHomeVideo/AdminHomeVideo'

const supabase = createClientComponentClient<Database>()

const AdminHome = () => {
  return (
    <div className={styles.wrapper}>
      <h1>AdminHome</h1>
      <AdminHomeVideo />
      <AdminNews />
      {/* <ReadOnlyTipTap />
      <TipTap /> */}
    </div>
  )
}

export default AdminHome
