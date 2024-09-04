/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'fs'

const getConfig = (configFilePath) => {
  if (fs.existsSync(configFilePath)) {
    return JSON.parse(fs.readFileSync(configFilePath, 'utf8'))
  }
  return {}
}
const saveConfig = (configFilePath, config) => {
  fs.writeFileSync(configFilePath, JSON.stringify(config))
}
export const getDefaultPrinter = (configFilePath) => {
  const config = getConfig(configFilePath)
  return config.defaultPrinter || ''
}
export const setDefaultPrinter = (configFilePath, printerName) => {
  const config = getConfig(configFilePath)
  config.defaultPrinter = printerName
  saveConfig(configFilePath, config)
}
module.exports = {
  getDefaultPrinter,
  setDefaultPrinter
}
