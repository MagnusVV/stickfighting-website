import CalendarWrapper from '@/components/Calendar/CalendarWrapper/CalendarWrapper'
import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'

const page = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <CalendarWrapper />
    </main>
  )
}

export default page
