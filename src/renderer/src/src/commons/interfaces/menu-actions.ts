import { IconType } from 'react-icons/lib'
export interface IMenuActions {
  id?: number
  icon: IconType
  title?: string
  show: boolean
  onClick?: () => void
}
