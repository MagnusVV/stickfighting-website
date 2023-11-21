import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'
import styles from './PortalModal.module.css'

interface ModalContentProps {
  onClose: () => void
  content: React.ReactNode
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, content }) => {
  return (
    <div className={styles.newsModalContent}>
      {content}
      <Button styling={genericButton} text="Stäng" onClickEvent={onClose} />
    </div>
  )
}

export default ModalContent
