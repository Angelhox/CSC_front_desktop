/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import useSubmitForm from '@renderer/src/api/commons/useSubmitForm'
import { changeSocio } from '@renderer/src/api/Contratos/contratos.service'
import { optionSearchBar, SearchBar } from '@renderer/src/components/SearchBar/SearchBar'
import {
  ConfirmDialogProps,
  ConfirmDialog
} from '@renderer/src/components/Shared/Dialogs/ConfirmDialog'
import { UseSocios } from '@renderer/src/context/socios.context'
import { fechaActual } from '@renderer/src/functions/commons/fechas'
import { ISocioContrato } from '@renderer/src/Interfaces/Contratos/contratos.interface'
import { ISocio } from '@renderer/src/Interfaces/Socios/socios.interface'
import { useContratoStore } from '@renderer/src/store/contratos'
import { socioContratoSchema } from '@renderer/src/validations/contrato-schema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoManOutline } from 'react-icons/io5'
import { toast } from 'sonner'
interface Props {
  socioActual: ISocio
  contratacionId: number
  beforeSUbmit: () => void
}
export const FormChangeSocio = ({
  socioActual,
  contratacionId,
  beforeSUbmit
}: Props): JSX.Element => {
  const { contratoId, contratoCodigo } = useContratoStore((state) => state)
  const { socios } = UseSocios()
  const [options, setOptions] = useState<optionSearchBar[] | undefined>(undefined)
  useEffect(() => {
    if (socios) {
      const sociosFiltered = socios.filter((socio) => socio.id !== socioActual.id)
      setOptions(
        sociosFiltered.map((socio, index) => {
          return {
            value: socio.id ? socio.id : index,
            label: `${socio.primerApellido} ${socio.segundoApellido} ${socio.primerNombre} ${socio.segundoNombre} ${socio.cedulaPasaporte}`,
            header: `${socio.primerApellido} ${socio.segundoApellido} ${socio.primerNombre} (${socio.barrio})`,
            subtitle: socio.cedulaPasaporte,
            text: socio.correo,
            data: socio
          }
        })
      )
    }
  }, [socios])
  useEffect(() => {
    setValue('fechaContratacion', fechaActual())
    setValue('estado', 'Activo')
  }, [])
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<ISocioContrato>({ resolver: zodResolver(socioContratoSchema) })
  console.log('Errores desde el schema: ', errors)
  const { handleSubmit: handleSubmitWithSubmit, isSubmitting } = useSubmitForm<ISocioContrato>({
    onSubmit: async (values) => {
      console.log('To submit: ', values)
      const action = changeSocio
      await action(values, contratacionId)
        .then(() => {
          toast.success('¡Actualizaste el socio de este contrato!', { className: 'notify-success' })
          beforeSUbmit()
        })
        .catch((error) => {
          toast.error(error.message, { className: 'notify-error' })
        })
    }
  })
  const onSubmit = (formData: ISocioContrato): void => {
    const conFirmProps: ConfirmDialogProps = {
      title: '¿Quieres cambiar el socio al que le pertenece este contrato?',
      text: 'No podras revertir esta accion',
      onConfirm: () => handleSubmitWithSubmit(formData),
      showBeforeConfirm: false
    }
    ConfirmDialog(conFirmProps)
  }
  return (
    <form className="Formulario" onSubmit={handleSubmit(onSubmit)}>
      {/* <h2>Cambiar Socio del Contrato</h2> */}
      <div className="content">
        <div className="divider">
          <p>Socio Actual</p>
          <IoManOutline />
        </div>
        <div className="input-group type-google" hidden>
          <input
            type="text"
            id="actualContratoId"
            defaultValue={contratoId || 0}
            readOnly
            {...register('contratosId')}
          />
          <label htmlFor="actualContratoId">Contrato</label>
        </div>
        <div className="input-group type-google w-100">
          <input
            type="text"
            id="actualContratoCodigo"
            defaultValue={contratoCodigo || 0}
            readOnly
          />
          <label htmlFor="actualContratoCodigo">Contrato</label>
        </div>
        <div className="input-group type-google" hidden>
          <input type="text" id="actualPrimerNombre" defaultValue={contratacionId} readOnly />
          <label htmlFor="actualPrimerNombre">Contratacion</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            id="actualPrimerNombre"
            defaultValue={socioActual.primerNombre}
            readOnly
          />
          <label htmlFor="actualPrimerNombre">Primer Nombre</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            id="actualSegundoNombre"
            defaultValue={socioActual.segundoNombre}
            readOnly
          />
          <label htmlFor="actualSegundoNombre">Segundo Nombre</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            id="actualPrimerApellido"
            defaultValue={socioActual.primerApellido}
            readOnly
          />
          <label htmlFor="actualPrimerApellido">Primer Apellido</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            id="actualSegundoApellido"
            defaultValue={socioActual.segundoApellido}
            readOnly
          />
          <label htmlFor="actualSegundoApellido">Segundo Apellido</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            id="actualCedulaPasaporte"
            defaultValue={socioActual.cedulaPasaporte}
            readOnly
          />
          <label htmlFor="actualCedulaPasaporte">Identificación</label>
        </div>
        <div className="divider">
          <p>Nuevo Socio</p>
          <IoManOutline />
        </div>
        <div className="input-group search-bar">
          <SearchBar
            options={options}
            placeholder="Selecciona el nuevo socio"
            // handleChange={handleChange}
            control={control}
            name="sociosId"
            onChangeActions={() => console.log('Nuevo socio seleccionado')}
          />
          {errors.sociosId?.message && <p>{errors.sociosId.message}</p>}
        </div>
        {/* Fecha contratacion */}
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="nuevaFechaContratacion"
            {...register('fechaContratacion')}
            readOnly
          />
          <label htmlFor="nuevaFechaContratacion">Fecha Contratación</label>
          {errors.fechaContratacion?.message && <p>{errors.fechaContratacion.message}</p>}
        </div>
        {/*Estado de contratacion*/}
        <div className="input-group type-google">
          <label htmlFor="nuevoEstadoContratacion" className="select">
            Estado contratación
          </label>
          <input id="nuevoEstadoContratacion" required {...register('estado')} readOnly />
          {errors.estado?.message && <p>{errors.estado.message}</p>}
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
