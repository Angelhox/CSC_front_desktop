import { IServiciosContratados } from '../../Interfaces/Servicios/servicios.interface'
import { PrinterSelect } from '@renderer/src/components/Shared/PrinterSelect/PrinterSelect'

export const contarContratadosByServicioNombre = (
  serviciosContratados: IServiciosContratados[]
) => {
  const serviciosAgrupados = agruparPorServicioNombre(serviciosContratados)
  const serviciosAgrupadosArray = Object.entries(serviciosAgrupados).map(
    ([nombreServicio, servicios]) => ({
      nombreServicio,
      servicios
    })
  )
  return serviciosAgrupadosArray
}
const agruparPorServicioNombre = (serviciosContratados: IServiciosContratados[]) => {
  return serviciosContratados.reduce(
    (acumulador, actual) => {
      if (actual.servicio?.tipo !== 'Cuota') {
        const nombreServicio = actual.servicio?.nombre
        if (nombreServicio) {
          if (!acumulador[nombreServicio]) {
            acumulador[nombreServicio] = []
          }
          acumulador[nombreServicio].push(actual)
        }
      }
      return acumulador
    },
    {} as Record<string, IServiciosContratados[]>
  )
}

