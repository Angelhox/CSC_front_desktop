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
export {}
