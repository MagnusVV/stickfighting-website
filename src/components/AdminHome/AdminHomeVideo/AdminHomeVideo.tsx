import VideoHandler from './VideoHandler/VideoHandler'
import styles from './AdminHomeVideo.module.css'

const AdminHomeVideo = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Video hantering</h1>
      <VideoHandler />
    </div>
  )
}

export default AdminHomeVideo
