/* eslint-disable @typescript-eslint/no-unused-vars */
import './WithChildren.scss'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
interface Props {
  title?: string
  isOpen: boolean
  externalHandle: (value: boolean) => void
  children: JSX.Element
}
// Establecer el elemento raíz de la aplicación para el modal
Modal.setAppElement('#root') // Esto es necesario para accesibilidad (Evita problemas con screen readers)

export const WithChildrenModal = ({
  title,
  isOpen,
  externalHandle,
  children
}: Props): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen)
  useEffect(() => {
    setIsModalOpen(isOpen)
    console.log('useEffect')
  }, [isOpen])
  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => {
    setIsModalOpen(false)
    externalHandle(false)
  }
  if (!isModalOpen) {
    return null
  }
  return (
    <div className="WithChildren-modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title} </h2>
        </div>
        <div className="modal-body type-form">{children}</div>
        <div className="modal-footer">
          <button className="modal-button" onClick={closeModal}>
            Cancelar
          </button>
          {/* <button className="modal-button primary">Aceptar</button> */}
        </div>
      </div>
    </div>
  )
}
