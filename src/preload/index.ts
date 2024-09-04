/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import path from 'path'
// Ruta del archivo de configuración
const configFilePath = path.join(__dirname, 'config.json')
// Función para leer la configuración
// const readConfig = () => {
//   if (fs.existsSync(configFilePath)) {
//     return JSON.parse(fs.readFileSync(configFilePath, 'utf8'))
//   }
//   return {}
// }

// Función para escribir la configuración
const writeConfig = (config) => {
  fs.writeFileSync(configFilePath, JSON.stringify(config))
}

// Custom APIs for renderer
const api = {
  readConfig: () => {
    console.log('On expose 1')
    return ipcRenderer.invoke('get-config')
  },
  writeConfig,
  getPrinters: () => {
    console.log('On expose')
    return ipcRenderer.invoke('get-printers')
  },
  selectPrinter: (printerName: string) => {
    console.log('On expose 2')
    return ipcRenderer.invoke('select-printer', printerName)
  },
  getSelectedPrinter: () => ipcRenderer.invoke('get-selected-printer')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
