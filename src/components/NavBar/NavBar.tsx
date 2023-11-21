'use client'
// After several server-side tries, we converted it to a client-side-component instead. FIXME: Will try to rebuild as server-side-component instead.

import Link from 'next/link'
import styles from './Navbar.module.css'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Database } from '@/lib/codeBlockSupabase'
import { FaBars } from 'react-icons/fa'

const NavBar: React.FC = () => {
  // TODO: Replace this part with Logged in-prop from the page.tsx this component is placed in? -MV --->
  const [userSession, setUserSession] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchSession = async () => {
      const cookie = await supabase.auth.getSession()

      if (cookie.data.session) {
        setUserSession(true)
      }
    }
    fetchSession()
  }, [supabase.auth])

  // <--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---|

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => {
          setMenuOpen(!menuOpen)
        }}
      >
        <FaBars size="1.5rem" />
      </button>
      {menuOpen && (
        <div className={styles.hamburgerMenu}>
          <Link href="/">Start</Link>
          <Link href="/schema">Schema</Link>
          <Link href="/om_oss">Om oss</Link>
          <Link href="/galleri">Bildgalleri</Link>
          {/* Conditional rendering of admin-link */}
          {userSession && <Link href="/admin">Admin</Link>}
        </div>
      )}
      <div className={styles.menu}>
        <Link href="/">Start</Link>
        <Link href="/schema">Schema</Link>
        <Link href="/om_oss">Om oss</Link>
        <Link href="/galleri">Bildgalleri</Link>
        {/* Conditional rendering of admin-link */}
        {userSession && <Link href="/admin">Admin</Link>}
      </div>
    </nav>
  )
}

export default NavBar
