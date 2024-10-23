import Swal, { SweetAlertIcon } from 'sweetalert2'

export interface InformDialogProps {
  title: string
  text?: string
  icon: SweetAlertIcon
  showConfirmButton?: boolean
  confirmButtonText?: string
  onConfirmAction?: (value?: string) => void
  showCancelButton?: boolean
  cancelButtonText?: string
  cancelButtonColor?: string
  showCloseButton?: boolean
  timer?: number
  html?: string | HTMLElement | JQuery
}
export function InformDialog({
  title,
  text,
  icon,
  html,
  timer,
  showConfirmButton,
  confirmButtonText,
  onConfirmAction,
  showCancelButton,
  cancelButtonText,
  cancelButtonColor,
  showCloseButton
}: InformDialogProps): void {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    html: html ? html : '',
    text: text ? text : '',
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText ? confirmButtonText : 'Aceptar',
    confirmButtonColor: '#4071b3',
    showCloseButton: showCloseButton,
    showCancelButton: showCancelButton,
    cancelButtonText: cancelButtonText ? cancelButtonText : 'Cancelar',
    cancelButtonColor: cancelButtonColor ? cancelButtonColor : '#e74c3c',
    timer: timer
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirmAction ? onConfirmAction() : ''
    }
  })
}
