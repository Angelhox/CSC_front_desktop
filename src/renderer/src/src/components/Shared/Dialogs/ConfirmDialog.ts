/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from 'sweetalert2'

export interface ConfirmDialogProps {
  title: string
  text?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: (values?: any) => void | Promise<void>
  onCancel?: (values?: any) => void
  beforeConfirmTitle?: string
  beforeConfirmText?: string
  showBeforeConfirm?: boolean
}
export function ConfirmDialog({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  showBeforeConfirm,
  beforeConfirmTitle,
  beforeConfirmText
}: ConfirmDialogProps): void {
  Swal.fire({
    title: title,
    text: text || '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '',
    confirmButtonText: confirmButtonText || 'Confirmar',
    cancelButtonText: cancelButtonText || 'Cancelar',
    showClass: { popup: 'swal' }
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) {
        onConfirm()
      }
      if (showBeforeConfirm) {
        Swal.fire({
          title: beforeConfirmTitle || '¡Hecho!',
          text: beforeConfirmText || '',
          icon: 'success',
          showClass: { popup: 'swal' }
        })
      }
    } else {
      if (onCancel) {
        onCancel()
      }
    }
  })
}
