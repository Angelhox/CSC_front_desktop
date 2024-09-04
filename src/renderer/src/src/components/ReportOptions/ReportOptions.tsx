/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormatReports, Formats } from '../Shared/Select/FormatReports/FormatReports'
import { convertToCSV, downloadCSV, generateReport, getKeys, separateCamelCase } from './functions'
import { Order } from './helpers'
import './ReportOptions.scss'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
type Props = {
  data: any[] | null
}

export function ReportOptions({ data }: Props): JSX.Element {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [sortAttribute, setSortAttribute] = useState<string>()
  const [sortOrder, setSortOrder] = useState<Order>(Order.ASC)
  const [selectedFormat, setSelectedFormat] = useState<Formats>(Formats.Pdf)
  useEffect(() => {
    if (data) {
      const attributes = getKeys(data)
      setSortAttribute(attributes[0] !== 'id' ? attributes[0] : attributes[1])
    }
  }, [])
  const validateGenerateReport = (data: any[]) => {
    if (selectedKeys.length <= 0) {
      toast.error('Selecciona los datos a mostrar', { className: 'notify-error' })
    } else {
      if (sortAttribute) {
        if (selectedFormat === Formats.Csv) {
          const cvsData = convertToCSV(data, selectedKeys, sortAttribute, sortOrder)
          downloadCSV(cvsData, 'table.csv')
        } else {
          generateReport(data, selectedKeys, sortAttribute, sortOrder)
        }
      } else {
        toast.error('Selecciona el atributo de orden', { className: 'notify-error' })
      }
    }
  }

  const handleCheckBoxesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    if (checked === true) {
      // Si el checkbox es marcado, añade el valor al estado
      setSelectedKeys((prevSelectedKeys) => [...prevSelectedKeys, value])
    } else {
      // Si el checkbox es desmarcado alimino el valor del estado
      setSelectedKeys((prevSelectedKeys) => prevSelectedKeys.filter((key) => key !== value))
    }
    console.log('Values of checkbox: ', selectedKeys)
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSortAttribute(value)
  }
  const handleChangeRadio = (sortOrder: Order) => {
    setSortOrder(sortOrder)
  }
  const selectFormatReport = (formatReport: Formats) => {
    setSelectedFormat(formatReport)
    console.log('Formato seleccionado: ', formatReport)
  }
  return (
    <div className="OptionsReport">
      <div className="content">
        {' '}
        <FormatReports selectFormatReport={selectFormatReport} />
        <div className="input-group type-google text">
          <select name="" id="order-selector" onChange={handleSelectChange}>
            {/* <option value="">Seleccionar...</option> */}
            {data ? (
              getKeys(data).map((key: string, index: number) => {
                if (key !== 'id') {
                  return (
                    <option key={index} value={key}>
                      {separateCamelCase(key)}
                    </option>
                  )
                } else {
                  return null
                }
              })
            ) : (
              <option>Sin datos</option>
            )}
          </select>
          <label htmlFor="order-selector">Ordenar por</label>
        </div>
        <div className="order-options">
          <div>
            <input
              type="radio"
              name="order"
              value="asc"
              onChange={() => handleChangeRadio(Order.ASC)}
            />
            <label htmlFor="">Ascendente</label>
          </div>
          <div>
            <input
              type="radio"
              name="order"
              value="desc"
              onChange={() => handleChangeRadio(Order.DESC)}
            />
            <label htmlFor="">Descendente</label>
          </div>
        </div>
        <label htmlFor="">Datos a mostrar</label>
        <div className="data-radio">
          {data ? (
            getKeys(data).map((key: string, index: number) => {
              if (key !== 'id') {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={key}
                      value={key}
                      onChange={handleCheckBoxesChange}
                    />
                    <label htmlFor={key}>{separateCamelCase(key)}</label>
                  </div>
                )
              } else {
                return null
              }
            })
          ) : (
            <div>
              <input type="checkbox" name={'noData'} />
              <label htmlFor={'noData'}>Sin datos</label>
            </div>
          )}
        </div>
      </div>
      <div className="buttons">
        {' '}
        <button
          onClick={
            data ? () => validateGenerateReport(data) : () => console.log('no data for report')
          }
        >
          Generar
        </button>
      </div>
    </div>
  )
}
