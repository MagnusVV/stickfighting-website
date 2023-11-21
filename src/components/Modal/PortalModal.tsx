'use client'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import { useState } from 'react'
import { genericButton } from '../Button/assortedButtons'
import Button from '../Button/Button'

const PortalModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <Button
        styling={genericButton}
        type="button"
        text="Se nyhet"
        onClickEvent={() => setShowModal(true)}
      />
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  )
}

export default PortalModal
