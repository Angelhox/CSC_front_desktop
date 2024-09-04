import { StyleDictionary } from 'pdfmake/interfaces'
export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}
export const styles: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5]
  },
  h2: {
    fontSize: 16,
    bold: true
  },
  h3: {
    fontSize: 14,
    bold: true
  },
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 0, 0, 10]
  },
  tableExample: {
    fontSize: 10,
    margin: [5, 5]
  }
}
