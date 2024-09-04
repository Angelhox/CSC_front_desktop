import './HeaderForm.scss'
import { IMenuActions } from '../../../commons/interfaces/menu-actions'
type Props = {
  menuActions: IMenuActions[]
  title: string
  showMenuActions?: boolean
  show: boolean
}
export function HeaderForm({ title, menuActions, showMenuActions, show }: Props): JSX.Element {
  return (
    <section className="header" style={show ? {} : { display: 'none' }}>
      <h1>{title}</h1>
      <div className="Items">
        {showMenuActions
          ? menuActions.map((menuAction) =>
              menuAction.show ? (
                <div className="item" key={menuAction.id} onClick={menuAction.onClick}>
                  <menuAction.icon />
                  <span>{menuAction.title}</span>
                </div>
              ) : (
                ''
              )
            )
          : ''}
      </div>
    </section>
  )
}
