import Swal from 'sweetalert2'

interface ConfirmDialogProps {
  title: string
  text?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
  onCancel?: (values: void) => Promise<void>
  beforeConfirmTitle?: string
  beforeConfirmText?: string
}
export function ConfirmDialog({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
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
      Swal.fire({
        title: beforeConfirmTitle || '¡Hecho!',
        text: beforeConfirmText || '',
        icon: 'success',
        showClass: { popup: 'swal' }
      })
    }
  })
}
