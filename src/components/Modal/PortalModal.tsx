'use client'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import { useState } from 'react'
import Button from '../Button/Button'
import styles from './PortalModal.module.css'
import { PortalModalProps } from '@/lib/types'

const PortalModal: React.FC<PortalModalProps> = ({
  modalIsOpen = false,
  content,
  hasExtraButton = true,
  buttonStyling,
  buttonText = '',
  buttonType = 'button',
}) => {
  const [showModal, setShowModal] = useState<boolean>(modalIsOpen)

  console.log({ content })

  return (
    <div className={styles.modal}>
      {hasExtraButton && (
        <Button
          styling={buttonStyling}
          text={buttonText}
          type={buttonType}
          onClickEvent={() => setShowModal(true)}
        />
      )}
      {showModal &&
        createPortal(
          <ModalContent
            content={content}
            onClose={() => setShowModal(false)}
          />,
          document.body,
        )}
    </div>
  )
}

export default PortalModal
