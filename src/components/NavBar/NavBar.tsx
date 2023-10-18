import Link from 'next/link'
import styles from './Navbar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">Start</Link>
      <Link href="/schema">Schema</Link>
      <Link href="/nyhet">Nyhet</Link>
      <Link href="/om_oss">Om oss</Link>
      <Link href="/galleri">Galleri</Link>
    </nav>
  )
}

export default NavBar
