/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

import { useState } from 'react'
import { ChartProps } from '../DoughnutChart/DoughnutChart'
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels)
// type Props = {
//   chartData: any;
// };
const options: ChartOptions<'bar'> = {
  responsive: true,
  indexAxis: 'y',
  plugins: {
    datalabels: {
      color: 'white',
      font: { size: 14 }
    },
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        color: 'white', // Color del texto de la leyenda
        font: { size: 20 }
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.7)',
      titleFont: {
        size: 20
      },
      bodyFont: {
        size: 16
      }
    }
  },
  scales: {
    x: {
      // title: {
      //   display: true,
      //   text: "Servicios",
      //   color: "red",
      //   font: {
      //     size: 16,
      //   },
      // },
      ticks: {
        color: '#31476e', // Color de las etiquetas del eje X
        precision: 5,
        align: 'center',
        maxRotation: 50,
        minRotation: 92,
        mirror: false,
        font: {
          family: 'Arial',
          size: 16,
          weight: 'normal',
          style: 'normal'
        }
      }
    },
    y: {
      // title: {
      //   display: true,
      //   text: "N° de contratados",
      //   color: "red",
      //   font: {
      //     size: 16,
      //   },
      // },
      ticks: {
        color: 'black', // Color de las etiquetas del eje Y
        font: {
          size: 14
        }
      }
    }
  },
  layout: {
    padding: {
      top: 10,
      right: 0,
      bottom: 50,
      left: 0
    }
  }
}

export function BarChart({ chartData, label }: ChartProps) {
  const [data, setData] = useState<ChartData<'bar', number[], unknown>>({
    labels: chartData.map((dataItem) => dataItem.label),
    datasets: [
      {
        label: label,
        data: chartData.map((dataItem) => dataItem.value),
        backgroundColor: [
          '#FF5733', // Naranja
          '#3498DB', // Azul
          '#2ECC71', // Verde
          '#9B59B6', // Morado
          '#F1C40F', // Amarillo
          'rgb(255, 99, 71)', // Rojo
          'rgb(0, 128, 0)', // Verde
          'rgb(128, 0, 128)', // Púrpura
          'rgba(0, 0, 255, 0.5)', // Azul con transparencia
          'hsl(240, 100%, 50%)', // Azul
          'hsla(120, 100%, 50%, 0.5)' // Verde con transparencia
        ],
        borderWidth: 2,
        borderRadius: 10
      }
    ]
  })

  return <Bar data={data} options={options} />
}
