import VideoHandler from './VideoHandler/VideoHandler'
import styles from './AdminHomeVideo.module.css'

const AdminHomeVideo = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Videohantering</h2>
      <VideoHandler />
    </div>
  )
}

export default AdminHomeVideo
