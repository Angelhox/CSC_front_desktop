import { useEffect, useState } from 'react'
import './PrinterSelect.scss'
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
export const PrinterSelect = (): JSX.Element => {
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
        console.log('Error react: ', error)
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
    window.api.selectPrinter(printerName)
  }
  return (
    <div>
      <h1>Select a Printer</h1>
      <select value={selectedPrinter} onChange={handlePrinterSelect}>
        {printers.map((printer) => (
          <option key={printer} value={printer}>
            {printer}
          </option>
        ))}
      </select>
    </div>
  )
}
