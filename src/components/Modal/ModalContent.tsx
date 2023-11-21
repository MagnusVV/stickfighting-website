import Button from '../Button/Button'
import { genericButton } from '../Button/assortedButtons'

interface ModalContentProps {
  onClose: () => void
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
  return (
    <div className="newsModal">
      <div>Nyheten!</div>
      <Button styling={genericButton} text="Stäng" onClickEvent={onClose} />
    </div>
  )
}

export default ModalContent
