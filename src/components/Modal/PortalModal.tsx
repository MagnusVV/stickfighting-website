'use client'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import { useState } from 'react'
import { openNewsModal } from '../Button/assortedButtons'
import Button from '../Button/Button'
import styles from './PortalModal.module.css'

const PortalModal = () => {
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
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </div>
  )
}

export default PortalModal
