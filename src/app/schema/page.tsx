import CalendarWrapper from '@/components/Calendar/CalendarWrapper/CalendarWrapper'
import styles from '../page.module.css'
import NavBar from '@/components/NavBar/NavBar'
import PageTitle from '@/components/PageTitle/PageTitle'

const page = () => {
  return (
    <main className={styles.main}>
      <PageTitle pageTitle="Schema" />
      <NavBar hamburgerColor="white" />
      <CalendarWrapper />
    </main>
  )
}

export default page
