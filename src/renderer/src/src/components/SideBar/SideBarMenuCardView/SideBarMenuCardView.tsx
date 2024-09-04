/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsercard } from '../../../commons/interfaces/left-menu'
import { classNames } from '../../../util/clases'
import { useNavigate } from 'react-router-dom'
import './SideBarMenuCardView.scss'
interface Props {
  isOpen: boolean
  card: IUsercard
}
export function SideBarMenuCardView({ card, isOpen }: Props): JSX.Element {
  const navigate = useNavigate()
  const handleNavigate = (ruta: string): void => {
    navigate(ruta)
  }
  return (
    <div className="SideBarMenuCardView">
      <img className="profile" alt={card.displayName} src={card.photoUrl} width="100%" />
      <div className={classNames('profileInfo', isOpen ? '' : 'collapsed')}>
        <div className="name">{card.displayName}</div>
        <div className="title">{card.title}</div>
        <div className="url">
          <a onClick={() => handleNavigate(card.url)}>Ir al perfil</a>
        </div>
      </div>
    </div>
  )
}
