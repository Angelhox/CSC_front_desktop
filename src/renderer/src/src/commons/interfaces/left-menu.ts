import { IconType } from 'react-icons/lib'

export interface IMenuItem {
  id: string
  label: string
  icon: IconType
  url: string
}
export interface IUsercard {
  id: string
  displayName: string
  title: string
  photoUrl: string
  url: string
}
