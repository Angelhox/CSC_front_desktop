import { useEffect, useState } from 'react'
import './PrinterSelectModal.scss'
export interface PrinterConfig {
  defaultPrinter: string
}
export interface Api {
  readConfig: () => Promise<PrinterConfig | never>
  getPrinters: () => Promise<string[]>
  getSelectedPrinter: () => Promise<string>
  selectPrinter: (printerName: string) => Promise<void>
}
declare global {
  interface Window {
    api: Api
  }
}
interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  onSelect: (param: string) => void
}
export const PrinterSelectModal = ({
  isOpen,
  onClose,
  title,
  onSelect
}: Props): JSX.Element | null => {
  const [printers, setPrinters] = useState<string[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState<string>('')
  useEffect(() => {
    window.api
      .getPrinters()
      .then((printerList: string[]) => {
        setPrinters(printerList)
        console.log('Lista de impresoras: ', printerList)
      })
      .catch((error) => {
        console.log('Error listando impresoras: ', error)
      })
    const loadSelectedPrinter = async (): Promise<void> => {
      const config = await window.api.readConfig()
      if (config.defaultPrinter) {
        setSelectedPrinter(config.defaultPrinter)
      } else {
        console.log('No default printer')
      }
    }
    loadSelectedPrinter()
  }, [])
  const handlePrinterSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const printerName = event.target.value
    setSelectedPrinter(printerName)
  }
  const confirmSelect = (): void => {
    onSelect(selectedPrinter)
    window.api.selectPrinter(selectedPrinter)
    onClose()
  }
  if (!isOpen) {
    return null
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">{title}</div>
        <div className="modal-body">
          {' '}
          <select value={selectedPrinter} onChange={handlePrinterSelect}>
            {printers.map((printer) => (
              <option key={printer} value={printer}>
                {printer}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-button primary" onClick={confirmSelect}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
