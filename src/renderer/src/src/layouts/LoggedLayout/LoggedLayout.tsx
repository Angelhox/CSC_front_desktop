/* eslint-disable @typescript-eslint/no-unused-vars */
import { FcAdvertising } from 'react-icons/fc'
import { FcHome } from 'react-icons/fc'
import { FcConferenceCall } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'
import { FcStatistics } from 'react-icons/fc'
import { FcCollaboration } from 'react-icons/fc'
import { FcServices } from 'react-icons/fc'
import './LoggedLayout.scss'
import { SideBarMenu } from '../../components/SideBar/SideBarMenu/SideBarMenu'
import { IMenuItem, IUsercard } from '../../commons/interfaces/left-menu'
import { TopBar } from '../../components/TopBar/TopBar'
import { useAuthStore } from '../../store/auth'
import { IEmpleadoUsuario } from '../../Interfaces/Usuarios/usuarios.interface'
interface Props {
  children: JSX.Element
}
export default function LoggedLayout({ children }: Props) {
  const profile: IEmpleadoUsuario = useAuthStore((state) => state.profile)
  const items: IMenuItem[] = [
    {
      id: '1',
      label: 'Inicio',
      icon: FcHome,
      url: '/home'
    },
    {
      id: '2',
      label: 'Socios',
      icon: FcConferenceCall,
      url: '/socios'
    },
    {
      id: '3',
      label: 'Administradores',
      icon: FcBusinessman,
      url: '/administradores'
    },
    {
      id: '4',
      label: 'Contratos',
      icon: FcCollaboration,
      url: '/contratos'
    },
    {
      id: '5',
      label: 'Servicios',
      icon: FcServices,
      url: '/servicios'
    },
    {
      id: '6',
      label: 'Dashboard',
      icon: FcStatistics,
      url: '/example'
    }
  ]
  const card: IUsercard = {
    id: 'card01',
    displayName: `${profile.empleado.primerNombre} ${profile.empleado.primerApellido}`,
    title: `${profile.rol.rol}`,
    photoUrl: 'https://robohash.org/user3',
    url: '/'
  }

  return (
    <div className="LoggedLayout">
      <div className="content" id="children-content">
        <div className="left-menu">
          <SideBarMenu items={items} card={card} />
        </div>
        <div className="children-content ">
          <div className="top-bar">
            <TopBar />
          </div>
          {children}
        </div>
      </div>
      {/* <div className="footer">
        <p>Footer</p>
      </div> */}
    </div>
  )
}
