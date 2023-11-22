import styles from './PageTile.module.css'

const PageTitle = ({ pageTitle }: { pageTitle: string }) => {
  return <h2 className={styles.pageName}>{pageTitle}</h2>
}

export default PageTitle
