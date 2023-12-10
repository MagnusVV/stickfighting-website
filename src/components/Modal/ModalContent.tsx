import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'
import styles from './PortalModal.module.css'
import { ModalContentProps } from '@/lib/types'

const ModalContent: React.FC<ModalContentProps> = ({ onClose, content }) => {
  return (
    <div className={styles.modalContent}>
      {content}
      <Button styling={genericButton} text="Stäng" onClickEvent={onClose} />
    </div>
  )
}

export default ModalContent
