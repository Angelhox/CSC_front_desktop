/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import useSubmitForm from '@renderer/src/api/commons/useSubmitForm'
import { changeMedidor } from '@renderer/src/api/Contratos/contratos.service'
import {
  ConfirmDialog,
  ConfirmDialogProps
} from '@renderer/src/components/Shared/Dialogs/ConfirmDialog'
import { UseContratosContext } from '@renderer/src/context/contratos.context'
import { fechaActual } from '@renderer/src/functions/commons/fechas'
import { IMedidor, medidorEstado } from '@renderer/src/Interfaces/Medidores/medidores.interface'
import { useContratoStore } from '@renderer/src/store/contratos'
import { medidorSchema } from '@renderer/src/validations/servicio-contratado-schema'
import { FormEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { toast } from 'sonner'
interface Props {
  beforeSubmit: () => void
}
export const FormChangeMedidor = ({ beforeSubmit }: Props): JSX.Element => {
  const { contratoId, contratoMedidor: medidorActual } = useContratoStore((state) => state)
  const [updateMedidor, setUpdateMedidor] = useState<IMedidor | null>(medidorActual)
  const [fechaBaja, setFechaBaja] = useState<string>(fechaActual)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<IMedidor>({ resolver: zodResolver(medidorSchema) })
  const { handleSubmit: handleSubmitWithSubmit, isSubmitting } = useSubmitForm<IMedidor>({
    onSubmit: async (values) => {
      const action = changeMedidor
      if (updateMedidor && updateMedidor.id) {
        updateMedidor.fechaBaja = fechaBaja
        updateMedidor.estado = medidorEstado.Inactivo
        await action(values, updateMedidor, +updateMedidor.id)
          .then(() => {
            toast.success('¡Actualizaste el medidor de este contrato!', {
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
  const onSubmit = (formData: IMedidor): void => {
    const confirmProps: ConfirmDialogProps = {
      title: '¿Quieres cambiar el medidor de este contrato?',
      text: 'No podras revertir esta accion',
      onConfirm: () => handleSubmitWithSubmit(formData),
      showBeforeConfirm: false
    }
    ConfirmDialog(confirmProps)
  }
  const handleChangeFechaBaja = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log('Valor: ', e.currentTarget.value)
    setFechaBaja(e.currentTarget.value)
  }
  return (
    <form className="Formulario" onSubmit={handleSubmit(onSubmit)}>
      <div className="content">
        <div className="divider">
          <p>Medidor actual</p>
          <MdOutlineLocalOffer />
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="medidorId"
            readOnly
            defaultValue={medidorActual?.id}
          />
          <label htmlFor="medidorId">Id</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="codigoMedidor"
            readOnly
            defaultValue={medidorActual?.codigo}
          />
          <label htmlFor="codigoMedidor">Código</label>
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaInstalacionMedidor"
            defaultValue={medidorActual?.fechaInstalacion}
            readOnly
          />
          <label htmlFor="fechaInstalacionMedidor">Fecha de instalación</label>
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaInstalacionMedidor"
            defaultValue={fechaBaja}
            onInput={handleChangeFechaBaja}
          />
          <label htmlFor="fechaInstalacionMedidor">Fecha de baja</label>
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="marcaMedidor"
            defaultValue={medidorActual?.marca}
            readOnly
          />
          <label htmlFor="marcaMedidor">Marca</label>
        </div>
        <div className="input-group type-google">
          <input type="text" placeholder="" id="medidorEstado" readOnly defaultValue={'Inactivo'} />
          <label htmlFor="medidorEstado">Estado</label>
        </div>
        <div className="divider">
          <p>Datos del nuevo medidor</p>
          <MdOutlineLocalOffer />
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="contratosId"
            readOnly
            defaultValue={contratoId || 0}
            {...register('contratosId')}
          />
          <label htmlFor="contratosId"></label>
          {errors.contratosId?.message && <p>{errors.contratosId.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="codigo"
            readOnly
            defaultValue={medidorActual?.codigo}
            {...register('codigo')}
          />
          <label htmlFor="codigo">Código</label>
          {errors.codigo?.message && <p>{errors.codigo.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaInstalacion"
            {...register('fechaInstalacion')}
            defaultValue={fechaActual()}
          />
          <label htmlFor="fechaInstalacion">Fecha de instalación</label>
          {errors.fechaInstalacion?.message && <p>{errors.fechaInstalacion.message}</p>}
        </div>
        <div className="input-group type-google">
          <input type="text" placeholder="" id="marca" {...register('marca')} />
          <label htmlFor="marca">Marca</label>
          {errors.marca?.message && <p>{errors.marca.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="estado"
            readOnly
            {...register('estado')}
            defaultValue={'Activo'}
          />
          <label htmlFor="estado">Estado</label>
          {errors.estado?.message && <p>{errors.estado.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="observaciones"
            required
            {...register('observacion')}
          />
          <label htmlFor="observaciones">Observaciones</label>
          {errors.observacion?.message && <p>{errors.observacion.message}</p>}
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
