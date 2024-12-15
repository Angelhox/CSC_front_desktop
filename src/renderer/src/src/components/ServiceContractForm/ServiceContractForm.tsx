/* eslint-disable @typescript-eslint/no-explicit-any */
import './ServiceContractForm.scss'
import {
  contratadoActivoEstado,
  IServicios,
  IServiciosContratados
} from '../../Interfaces/Servicios/servicios.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  servicioContratadoMedidorSchema,
  servicioContratadoSchema
} from '../../validations/servicio-contratado-schema'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { contract } from '../../assets'
import useSubmitForm from '../../api/commons/useSubmitForm'
import {
  createServicioContratado,
  descontratarServicio,
  updateServicioContratado
} from '../../api/ServiciosContratados/servicios.contratados.service'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { fechaActual } from '../../functions/commons/fechas'
import { UseDescuentosContext } from '../../context/tipos-descuento.context'
import { useContratoStore } from '../../store/contratos'
import { useConfigStore } from '../../store/config.store'
import { IMedidor, medidorEstado } from '@renderer/src/Interfaces/Medidores/medidores.interface'
import { ConfirmDialog, ConfirmDialogProps } from '../Shared/Dialogs/ConfirmDialog'
import { UseContratosContext } from '@renderer/src/context/contratos.context'
import { getContratoByContrato } from '@renderer/src/api/Contratos/contratos.service'
import { WithChildrenModal } from '../Shared/Modals/WithChildrenModal/WithChildrenModal'
import { FormChangeMedidor } from '@renderer/src/pages/Contratos/FormChangeMedidor'
interface IFormProps {
  dataServicio: IServicios | null
  dataServicioContratado?: IServiciosContratados | null
  back: () => void
}

export function ServiceContractForm({
  back,
  dataServicio,
  dataServicioContratado
}: IFormProps): JSX.Element {
  const { contratoMedidor, contratoId, contratoCodigo, setSocioContratoData, setContratoMedidor } =
    useContratoStore((state) => state)
  const { descuentos } = UseDescuentosContext()
  const { reloadRecords } = UseContratosContext()
  const [servicioBase, setServicioBase] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<IServiciosContratados>({
    resolver: zodResolver(servicioBase ? servicioContratadoMedidorSchema : servicioContratadoSchema)
  })
  console.log(errors)

  const [valoresDistintos, setValoresDistintos] = useState<boolean>(true)
  const [dataMedidor, setDataMedidor] = useState<IMedidor | null>(contratoMedidor)
  const { idServicioBase } = useConfigStore((state) => state)
  const [openModalChangeMedidor, setOpenModalChangeMedidor] = useState<boolean>(false)
  useEffect(() => {
    console.log('updating data medidor')
    setDataMedidor(contratoMedidor)
  }, [contratoMedidor])
  useEffect(() => {
    if (dataServicio) {
      validateServicioBase(dataServicio?.id)
      if (dataServicioContratado !== null) {
        console.log('Servicio Contratado: ', dataServicioContratado)
        setValue('numeroPagosIndividual', dataServicioContratado?.numeroPagosIndividual || 0)
        setValue('valorPagosIndividual', dataServicioContratado?.valorPagosIndividual || 0)
        setValue('valorIndividual', dataServicioContratado?.valorIndividual || 0)
        setValue('descuentosId', dataServicioContratado?.tipoDescuento?.id || 0)
        setValue('descuentoValor', dataServicioContratado?.descuentoValor || 0)
        setValue('fechaEmision', dataServicioContratado?.fechaEmision || fechaActual())
        setValue('estado', dataServicioContratado?.estado || contratadoActivoEstado.Activo)
        if (dataMedidor) {
          setValue('medidor.codigo', dataMedidor?.codigo)
          setValue('medidor.fechaInstalacion', dataMedidor?.fechaInstalacion)
          setValue('medidor.marca', dataMedidor?.marca)
          setValue('medidor.estado', dataMedidor?.estado)
          setValue('medidor.observacion', dataMedidor?.observacion)
        }
      } else {
        setValue('numeroPagosIndividual', dataServicio?.numeroPagos || 0)
        setValue('valorPagosIndividual', dataServicio?.valorPagos || 0)
        setValue('valorIndividual', dataServicio?.valor || 0)
        setValue('fechaEmision', fechaActual())
        setValue('medidor.codigo', contratoCodigo || '')
      }
      setValue('serviciosId', dataServicio?.id || 0)
      setValue('base', dataServicio?.base)
      setValoresDistintos(dataServicio?.valoresDistintosSn === 'Si' ? true : false)
    }
    setValue('contratosId', contratoId || 0)
    setValue('medidor.contratosId', contratoId || 0)
  }, [dataServicio, dataServicioContratado, contratoId, dataMedidor, setValue])

  const updateDataSocioContrato = async (contratoId: number): Promise<void> => {
    const updatedDataSocioContrato = await getContratoByContrato(contratoId)
    setSocioContratoData(updatedDataSocioContrato)
    const medidorExisting = updatedDataSocioContrato.contrato.medidor.find(
      (medidor) => medidor.estado === medidorEstado.Activo
    )
    medidorExisting && setContratoMedidor(medidorExisting)
  }

  const { handleSubmit: handleSubmitWithSubmit, isSubmitting } =
    useSubmitForm<IServiciosContratados>({
      onSubmit: async (values) => {
        const action = dataServicioContratado ? updateServicioContratado : createServicioContratado
        try {
          await action(values, dataServicioContratado?.id || '')
          const message = dataServicioContratado ? 'actualizado' : 'contratado'
          toast.success(`¡Servicio ${message} con éxito!`, { className: 'notify-success' })
          if (servicioBase && contratoId) {
            reloadRecords()
            updateDataSocioContrato(+contratoId)
            // const updatedDataSocioContrato = await getContratoByContrato(+contratoId)
            // setSocioContratoData(updatedDataSocioContrato)
            // const medidorExisting = updatedDataSocioContrato.contrato.medidor.find(
            //   (medidor) => medidor.estado === medidorEstado.Activo
            // )
            // medidorExisting && setContratoMedidor(medidorExisting)
          }
          back()
        } catch (error: any) {
          toast.error(error.message, { className: 'notify-error' })
        }
      }
    })
  const { handleSubmit: handleDelete, isSubmitting: isDeleting } = useSubmitForm<void>({
    onSubmit: async () => {
      if (
        dataServicioContratado?.id
        // && dataServicioContratado.servicio?.base && contratoId
      ) {
        await descontratarServicio(
          dataServicioContratado?.id
          // contratoId,
          // dataServicioContratado.servicio?.base
        )
          .then(() => {
            toast.success('¡Servicio descontratado con exito!', {
              className: 'notify-success'
            })
            back()
          })
          .catch((error) => {
            toast.error(error.message, { className: 'notify-error' })
          })
      }
    }
  })
  const handleChangeDescuento = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const option = e.target.selectedOptions[0]
    const descuento = option.getAttribute('data-valor')
    if (descuento) {
      setValue('descuentoValor', parseFloat(descuento))
    }
  }
  const changeNumeroPagosValor = (): void => {
    const numeroPagos: number = getValues('numeroPagosIndividual')
    const valorTotal: number = getValues('valorIndividual')
    setValue('valorPagosIndividual', valorTotal / numeroPagos)
  }
  const validateServicioBase = (idServicio?: number | string): void => {
    if (idServicio && idServicio === idServicioBase) {
      setServicioBase(true)
    }
  }
  const onSubmit = (data: IServiciosContratados): void => {
    handleSubmitWithSubmit(data)
  }
  const handleDeleteClick = (): void => {
    const confirmProps: ConfirmDialogProps = {
      title: '¿Quieres descontratar este servicio?',
      text: 'No podras revertir esta acción',
      onConfirm: handleDelete,
      beforeConfirmTitle: '¡Descontratado!',
      beforeConfirmText: 'El servicio se ha descontratado'
    }
    ConfirmDialog(confirmProps)
  }
  const handleClickChangeMedidor = (tf: boolean): void => {
    setOpenModalChangeMedidor(tf)
  }
  const beforeChangeMedidor = (): void => {
    if (servicioBase && contratoId) {
      reloadRecords()
      updateDataSocioContrato(+contratoId)
    }
    handleClickChangeMedidor(false)
  }
  const FormMedidor = (): JSX.Element => {
    setValue('medidor.estado', medidorEstado.Activo)
    return (
      <>
        <div className="divider">
          <p>Datos del medidor</p>
          <MdOutlineLocalOffer />
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="codigoMedidor"
            readOnly
            {...register('medidor.codigo')}
          />
          <label htmlFor="codigoMedidor">Código</label>
          {errors.medidor?.codigo?.message && <p>{errors.medidor.codigo.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaInstalacion"
            {...register('medidor.fechaInstalacion')}
          />
          <label htmlFor="fechaInstalacion">Fecha de instalación</label>
          {errors.medidor?.fechaInstalacion?.message && (
            <p>{errors.medidor.fechaInstalacion.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input type="text" placeholder="" id="marca" {...register('medidor.marca')} />
          <label htmlFor="marca">Marca</label>
          {errors.medidor?.marca?.message && <p>{errors.medidor.marca.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="medidorEstado"
            readOnly
            {...register('medidor.estado')}
          />
          <label htmlFor="medidorEstado">Estado</label>
          {errors.medidor?.estado?.message && <p>{errors.medidor.estado.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="observaciones"
            required
            {...register('medidor.observacion')}
          />
          <label htmlFor="observaciones">Observaciones</label>
          {errors.medidor?.observacion?.message && <p>{errors.medidor.observacion.message}</p>}
        </div>
        {contratoMedidor && (
          <div className="input-group type-google">
            <button
              className="middle-button"
              type="button"
              onClick={() => handleClickChangeMedidor(true)}
            >
              {/* <PiUserSwitch /> */}
              Cambiar Medidor
            </button>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {' '}
      {contratoMedidor && (
        <WithChildrenModal
          isOpen={openModalChangeMedidor}
          externalHandle={handleClickChangeMedidor}
          title="Cambiar medidor del contrato"
        >
          <FormChangeMedidor beforeSubmit={beforeChangeMedidor} />
        </WithChildrenModal>
      )}
      <div className="body body-contract-form">
        <form className="Formulario card-contract " onSubmit={handleSubmit(onSubmit)}>
          <div className="content content-contract">
            <img src={contract} alt="" className="card-img" />
            <h1 className="card-title">{dataServicio?.nombre}</h1>
            <p className={`card-indicator ${dataServicio?.selected ? ' valid' : ''}`}>
              {dataServicio?.selected ? dataServicio.statusForContract : ''}
            </p>
            <div className="card-body">
              <div className="card-description">{dataServicio?.descripcion}</div>

              <div className="card-star">
                <span className="star">&#9733;</span>
                <span className="rating-value">{dataServicio?.tipo}</span>
              </div>
              <div className="card-data">
                <p>
                  Valor<span>{` $${dataServicio?.valor}`}</span>
                </p>
                <p>
                  Plazos<span>{` ${dataServicio?.numeroPagos}`}</span>
                </p>
                <p>
                  Cuotas<span>{` $${dataServicio?.valorPagos}`}</span>
                </p>
              </div>
              <p className="card-price">$2.0</p>
            </div>
            {/* Inicio del formulario*/}
            <div className="divider">
              <p>{valoresDistintos ? 'Valores individuales' : 'Valores generales'}</p>
            </div>
            <div className="  card-form">
              {/* Formulario*/}
              <div className="input-group type-google">
                <input
                  type="date"
                  placeholder=""
                  id="fechaEmision"
                  required
                  {...register('fechaEmision')}
                />
                <label htmlFor="fechaEmision">Fecha de contratación</label>
                {errors.fechaEmision?.message && <p>{errors.fechaEmision.message}</p>}
              </div>
              <div className="input-group  type-google ">
                <label htmlFor="estado" className="select">
                  Estado
                </label>
                <select id="estado" required {...register('estado')}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo" disabled>
                    Inactivo
                  </option>
                </select>
                {errors.estado?.message && <p>{errors.estado.message}</p>}
              </div>
              <div className="input-group type-google">
                <input
                  type="number"
                  placeholder=""
                  id="base"
                  required
                  readOnly={true}
                  {...register('base')}
                />
                <label htmlFor="base">Base</label>
                {errors.base?.message && <p>{errors.base.message}</p>}
              </div>
              <div className="input-group type-google">
                <input
                  type="number"
                  step="any"
                  placeholder=""
                  id="valorIndividual"
                  required
                  readOnly={!valoresDistintos}
                  {...register('valorIndividual', {
                    onChange: changeNumeroPagosValor
                  })}
                />
                <label htmlFor="valor">Valor</label>
                {errors.valorIndividual?.message && <p>{errors.valorIndividual.message}</p>}
              </div>
              <div className="input-group type-google">
                <input
                  type="number"
                  placeholder=""
                  id="numeroPagosIndividual"
                  readOnly={!valoresDistintos}
                  required
                  {...register('numeroPagosIndividual', {
                    onChange: changeNumeroPagosValor
                  })}
                />
                <label htmlFor="numeroPagosIndividual">Número de pagos</label>
                {errors.numeroPagosIndividual?.message && (
                  <p>{errors.numeroPagosIndividual.message}</p>
                )}
              </div>
              <div className="input-group type-google">
                <input
                  type="number"
                  step="any"
                  placeholder=""
                  id="valorPagosIndividual"
                  required
                  readOnly={true}
                  {...register('valorPagosIndividual')}
                />
                <label htmlFor="valorPagos">Valor de los pagos</label>
                {errors.valorPagosIndividual?.message && (
                  <p>{errors.valorPagosIndividual.message}</p>
                )}
              </div>
              {servicioBase ? FormMedidor() : null}
              <div className="divider">
                <p>Descuentos</p>
                <MdOutlineLocalOffer />
              </div>
              <div className="input-group  type-google ">
                <label htmlFor="descuentosId" className="select">
                  Descuento
                </label>
                <select
                  id="descuentosId"
                  required
                  {...register('descuentosId')}
                  onChange={handleChangeDescuento}
                >
                  <option value="0">Selecciona un tipo de descuento</option>
                  {descuentos?.map((descuento) => (
                    <option
                      data-valor={descuento.valor}
                      key={descuento.id}
                      value={descuento.id}
                    >{`${descuento.descripcion} ($${descuento.valor})`}</option>
                  ))}
                </select>
                {errors.descuentosId?.message && <p>{errors.descuentosId.message}</p>}
                {errors.descuentoValor?.message && <p>{errors.descuentoValor.message}</p>}
              </div>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" disabled={isSubmitting}>
              {dataServicio?.selected ? 'Actualizar' : 'Contratar'}
            </button>
            {dataServicioContratado?.estado === contratadoActivoEstado.Activo && (
              <button type="button" disabled={isDeleting} onClick={handleDeleteClick}>
                Descontratar
              </button>
            )}
            <button className="cancel" type="button" disabled={isSubmitting} onClick={back}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
