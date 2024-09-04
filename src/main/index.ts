/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import path from 'path'
// import { getPrinters } from 'win32-pdf-printer'
import { exec } from 'child_process'
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle('get-printers', async () => {
  return new Promise((resolve, reject) => {
    exec(
      'powershell.exe -Command "Get-Printer | Select-Object -ExpandProperty Name"',
      (error, stdout, stderr) => {
        if (error) {
          console.log(stderr)
          console.error('Error getting impresoras:', error)
          reject(error)
        } else {
          const printers = stdout
            .split('\n')
            .map((printer) => printer.trim())
            .filter((printer) => printer !== '')
          resolve(printers)
        }
      }
    )
  })
})
// ipcMain.handle('get-printers', async () => {
//   try {
//     const printers = getPrinters()
//     console.log('Impresoras: ', printers)
//     return printers
//   } catch (error) {
//     console.log('Error getting printers : ', error)
//   }
// })
ipcMain.handle('select-printer', async (event, printerName: string) => {
  try {
    if (event) {
      console.log(event)
    }
    const config = readConfig()
    config.defaultPrinter = printerName
    writeConfig(config)
    return config
  } catch (error) {
    console.error('Error selecting printer:', error)
    return null
  }
})
// Obtener la impresora seleccionada
ipcMain.handle('get-selected-printer', () => {
  try {
    const config = readConfig()
    return config.printerName
  } catch (error) {
    console.error('Error getting selected printer: ', error)
    return null
  }
})
ipcMain.handle('get-config', () => {
  return readConfig()
})
function readConfig() {
  const configFilePath = path.join(app.getPath('userData'), 'printerConfig.json')
  try {
    if (fs.existsSync(configFilePath)) {
      const fileContent = fs.readFileSync(configFilePath, 'utf8')
      const config = JSON.parse(fileContent)
      if (typeof config !== 'object' || config === null) {
        throw new Error('Invalid config file format')
      }
      return config
    }
    return {}
  } catch (error) {
    console.error('Error reading config file: ', error)
    return {}
  }
}

function writeConfig(config: any): void {
  try {
    const configFilePath = path.join(app.getPath('userData'), 'printerConfig.json')
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('Error writing config')
  }
}
