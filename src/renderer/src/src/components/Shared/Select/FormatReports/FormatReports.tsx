/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { cvs, pdf } from '../../../../assets'
import './FormatReports.scss'
import { classNames } from '../../../../util/clases'
export enum Formats {
  Pdf = 'Pdf',
  Csv = 'Csv'
}
interface Props {
  selectFormatReport: (value: Formats) => void
}
export function FormatReports({ selectFormatReport }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<Formats>(Formats.Pdf)
  function activate(): void {
    setIsOpen(!isOpen)
  }
  function selectOption(e: any): void {
    setSelected(e.target.innerText)
    selectFormatReport(e.target.innerText)
    activate()
  }
  return (
    <div className="ContainerSelect">
      <div className="select-box">
        <div
          className={classNames('selected-option input-group type-google', isOpen ? 'active' : '')}
          onClick={activate}
        >
          <input
            type="text"
            name="tipo-reporte"
            id="tipo-reporte"
            value={selected}
            readOnly
            placeholder=""
          />
          <label htmlFor="tipo-reporte">Formato</label>
        </div>
        <ul className="options">
          <li className="option" onClick={selectOption}>
            {Formats.Pdf}
            <img src={pdf} alt="" />
          </li>
          <li className="option" onClick={selectOption}>
            {Formats.Csv}
            <img src={cvs} alt="" />
          </li>
        </ul>
      </div>
    </div>
  )
}
