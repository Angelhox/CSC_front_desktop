import React, { CSSProperties, useEffect, useState } from 'react'
// import { base } from "../../../../assets";
import './DashboardCard.scss'
import { FcApproval, FcHighPriority } from 'react-icons/fc'
import { ahorros } from '../../../../assets'
import { IconType } from 'react-icons'
const colors = ['#F1C40F', '#28a8e1', '#e74c3c'] // Lista de colores
export interface DashboardCardsProps {
  title: string
  image?: string
  loading: boolean
  error: string | null
  success: boolean
  icon: IconType
}
export function DashboardCard({
  title,
  image,
  icon,
  loading,
  error,
  success
}: DashboardCardsProps) {
  const [bgColor, setBgColor] = useState('')
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  useEffect(() => {
    setBgColor(getRandomColor())
  }, [])
  const bodyStyle: CSSProperties = {
    backgroundColor: bgColor
  }

  return (
    <div className="card" style={bodyStyle}>
      <div className="card-image">
        {image ? (
          <img src={ahorros} alt="no file" className="card-image-img" />
        ) : (
          React.createElement(icon, { className: 'card-image-img' })
        )}
      </div>

      <div className="card-body">
        <div className="card-text">
          {' '}
          <div>
            <strong>{title}</strong>
          </div>
          <div className="svg">
            {loading ? (
              <p>Loading...</p>
            ) : (
              (error && <FcHighPriority />) || (success && <FcApproval />)
            )}
          </div>
        </div>
        <div className="card-data">
          {(error && (
            <>
              <p>{error}</p>
            </>
          )) ||
            (success && (
              <>
                <p>Dino team</p>
              </>
            ))}
        </div>
      </div>
    </div>
  )
}
