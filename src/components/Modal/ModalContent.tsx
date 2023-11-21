import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'
import styles from './PortalModal.module.css'

interface ModalContentProps {
  onClose: () => void
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
  return (
    <div className={styles.newsModalContent}>
      <div>Nyheten!</div>
      <Button styling={genericButton} text="Stäng" onClickEvent={onClose} />
    </div>
  )
}

export default ModalContent
