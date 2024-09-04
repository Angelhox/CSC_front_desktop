/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getPrinters, print } from 'pdf-to-printer'
export const fetchPrinters = async () => {
  return await getPrinters()
}
export const printDocument = async (filePath, options) => {
  try {
    await print(filePath, options)
    console.log('Document printed successfully')
  } catch (error) {
    console.log('Error printing document: ', error)
  }
}
module.exports = {
  fetchPrinters,
  printDocument
}
