'use client'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import { useState } from 'react'
import { openNewsModal } from '../Button/assortedButtons'
import Button from '../Button/Button'
import styles from './PortalModal.module.css'

interface PortalModalProps {
  content: React.ReactNode
}

const PortalModal: React.FC<PortalModalProps> = ({ content }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div className={styles.newsModal}>
      <Button
        styling={openNewsModal}
        type="button"
        text=""
        onClickEvent={() => setShowModal(true)}
      />
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
