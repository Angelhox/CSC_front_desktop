/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import useSubmitForm from '@renderer/src/api/commons/useSubmitForm'
import { changeSector } from '@renderer/src/api/Contratos/contratos.service'

import {
  ConfirmDialogProps,
  ConfirmDialog
} from '@renderer/src/components/Shared/Dialogs/ConfirmDialog'
import { UseSectoresContext } from '@renderer/src/context/sectores.context'
import { IContratoSocioContrato } from '@renderer/src/Interfaces/Contratos/contratos.interface'
import { useContratoStore } from '@renderer/src/store/contratos'
import { sectorContratoSchema } from '@renderer/src/validations/contrato-schema'
import { useForm } from 'react-hook-form'
import { TfiMapAlt } from 'react-icons/tfi'
import { toast } from 'sonner'
import { generateCodigo } from './functions'
import { useEffect, useState } from 'react'
import { ISector } from '@renderer/src/Interfaces/Sectores/sectores.interface'
interface Props {
  sectorActual: string
  idSectorActual: number
  beforeSubmit: () => void
}
export const FormChangeSector = ({
  sectorActual,
  idSectorActual,
  beforeSubmit
}: Props): JSX.Element => {
  const { contratoId, contratoCodigo } = useContratoStore((state) => state)
  const { sectores } = UseSectoresContext()
  const [sectoresToChange, setSectoresToChange] = useState<ISector[] | null | undefined>(sectores)
  const [newSectorId, setnewSectorId] = useState<number>()
  useEffect(() => {
    setSectoresToChange(sectores?.filter((sector) => sector.id !== idSectorActual))
  }, [sectores])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IContratoSocioContrato>({ resolver: zodResolver(sectorContratoSchema) })
  console.log('Errores desde el schema: ', errors)
  const { handleSubmit: handleSubmitWithSubmit, isSubmitting } =
    useSubmitForm<IContratoSocioContrato>({
      onSubmit: async (values) => {
        if (contratoId && newSectorId) {
          console.log('To submit: ', values)
          const action = changeSector
          await action(values, +contratoId, newSectorId)
            .then(() => {
              toast.success('¡Actualizaste el socio de este contrato!', {
                className: 'notify-success'
              })
              beforeSubmit()
            })
            .catch((error) => {
              toast.error(error.message, { className: 'notify-error' })
            })
        }
      }
    })
  const onSubmit = (formData: IContratoSocioContrato): void => {
    const conFirmProps: ConfirmDialogProps = {
      title: '¿Quieres cambiar el socio al que le pertenece este contrato?',
      text: 'No podras revertir esta accion',
      onConfirm: () => handleSubmitWithSubmit(formData),
      showBeforeConfirm: false
    }
    ConfirmDialog(conFirmProps)
  }
  const handleChangeBarrio = (e: any): void => {
    const option: HTMLOptionElement = e.target.options[e.target.selectedIndex]
    if (option.value !== '0') {
      const sectoresId = option.getAttribute('data-id')
      const abrev = option.getAttribute('data-codigo')
      const numero = option.getAttribute('data-numero-socios')
      // Si estamos actualizando preguntar si se desea cambiar el codigo de contrato
      if (abrev && numero && sectoresId) {
        const codigoGenerado = generateCodigo(abrev, parseInt(numero) + 1 + '')
        if (option.value !== sectorActual) {
          setValue('contrato.codigo', codigoGenerado)
          setValue('contrato.sectoresId', parseInt(sectoresId))
          setnewSectorId(parseInt(sectoresId))
        }
      }
    }
  }
  return (
    <form className="Formulario" onSubmit={handleSubmit(onSubmit)}>
      {/* <h2>Cambiar Socio del Contrato</h2> */}
      <div className="content">
        <div className="divider">
          <p>Sector Actual</p>
          <TfiMapAlt />
        </div>
        <div className="input-group type-google">
          <input type="text" id="actualContratoId" defaultValue={contratoId || 0} readOnly />
          <label htmlFor="actualContratoId">Contrato</label>
        </div>
        <div className="input-group type-google">
          <input type="text" id="actualSectorId" defaultValue={idSectorActual} readOnly />
          <label htmlFor="actualSectorId">Id Sector</label>
        </div>
        <div className="input-group type-google w-100">
          <input type="text" id="actualContratoCodigo" defaultValue={sectorActual} readOnly />
          <label htmlFor="actualContratoCodigo">Barrio actual</label>
        </div>

        <div className="input-group type-google">
          <input type="text" id="actualPrimerNombre" readOnly defaultValue={contratoCodigo || ''} />
          <label htmlFor="actualPrimerNombre">Código actual</label>
        </div>

        <div className="divider">
          <p>Nuevo Sector</p>
          <TfiMapAlt />
        </div>
        {/* Barrio */}
        <div className="input-group type-google w-100">
          <label htmlFor="barrio" className="select">
            Barrio
          </label>
          <select
            required
            id="barrio"
            {...register('contrato.barrio')}
            onChange={(e) => handleChangeBarrio(e)}
          >
            <option value="0">Selecciona el nuevo barrio</option>
            {sectoresToChange?.map((option) => (
              <option
                key={option.id}
                value={option.barrio}
                data-id={option.id}
                data-numero-socios={option.numeroCodigos}
                data-codigo={`${option.codigo}${option.abreviatura}`}
              >
                {option.barrio}
              </option>
            ))}
          </select>

          {errors.contrato?.barrio?.message && <p>{errors.contrato.barrio.message}</p>}
        </div>
        {/*Estado de contratacion*/}
        <div className="input-group type-google">
          <label htmlFor="nuevoEstadoContratacion" className="select">
            Código
          </label>
          <input id="nuevoEstadoContratacion" required {...register('contrato.codigo')} readOnly />
          {errors.contrato?.codigo?.message && <p>{errors.contrato.codigo.message}</p>}
        </div>
      </div>
      <div className="buttons">
        <button type="submit" disabled={isSubmitting}>
          Guardar
        </button>
      </div>
    </form>
  )
}
