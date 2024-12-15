/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridColumn, GridRow, Image } from 'semantic-ui-react'
import './Auth.scss'
import { flag, logotemp, siluetComunity } from '../../assets'
import { useState } from 'react'
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm'
import { AuthOptions } from '../../components/Auth/AuthOptions/AuthOptions'

export function Auth() {
  const [typeForm, setTypeForm] = useState<string>('')
  const openLogin = (): void => {
    setTypeForm('login')
  }
  const goBack = (): void => {
    setTypeForm('')
  }
  const renderForm = (): JSX.Element => {
    if (typeForm === 'login') {
      return <LoginForm goBack={goBack} />
    }
    return <AuthOptions openLogin={openLogin} />
  }
  return (
    <div className="Auth">
      <div className="content-logo">
        <div className="content">
          <div className="logo">
            <Image src={logotemp} alt="CSC" />
            <div className="content-text">
              <p className="title">CSC</p>
              <p className="subtitle">Cobro de Servicios Ciudadanos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-slogan">
        <Image src={siluetComunity} className="solutions" />
        <h3 className="client">Comunidad Santo Domingo N°1</h3>
        <img src={flag} alt="..." className="flag" />
      </div>
      <div className="content-form">
        <div className="content">{renderForm()}</div>
      </div>
    </div>
  )
}
