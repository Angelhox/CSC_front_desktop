/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import '../../scss/commons/forms.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { contratoSocioContratoSchema } from '../../validations/contrato-schema'
import { PiUserSwitch } from 'react-icons/pi'
import { FaCloudscale } from 'react-icons/fa'
import { IoManOutline } from 'react-icons/io5'
import { LiaFileContractSolid } from 'react-icons/lia'
import { TfiMapAlt } from 'react-icons/tfi'
import { PiMapPinArea } from 'react-icons/pi'
import { TbExchange } from 'react-icons/tb'
import { IContratoSocioContrato } from '../../Interfaces/Contratos/contratos.interface'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { UseContratosContext } from '../../context/contratos.context'
import {
  createContrato,
  getContratoByContrato,
  getContratosBySocio,
  updateContrato
} from '../../api/Contratos/contratos.service'
import useSubmitForm from '../../api/commons/useSubmitForm'
import { SearchBar, optionSearchBar } from '../../components/SearchBar/SearchBar'
import { UseSocios } from '../../context/socios.context'
import { fechaActual } from '../../functions/commons/fechas'
import { UseSectoresContext } from '../../context/sectores.context'
import { generateCodigo } from './functions'
import { useContratoStore } from '../../store/contratos'
import {
  InformDialog,
  InformDialogProps
} from '@renderer/src/components/Shared/Dialogs/InformDialog'
import { IMedidor } from '@renderer/src/Interfaces/Medidores/medidores.interface'
import {
  ConfirmDialog,
  ConfirmDialogProps
} from '@renderer/src/components/Shared/Dialogs/ConfirmDialog'
import { WithChildrenModal } from '@renderer/src/components/Shared/Modals/WithChildrenModal/WithChildrenModal'
import { FormChangeSocio } from './FormChangeSocio'
import { FormChangeSector } from './FormChangeSector'
import { ISector } from '@renderer/src/Interfaces/Sectores/sectores.interface'
// type Inputs = IContratoMedidor
interface IFormProps {
  dataSocioContrato?: IContratoSocioContrato | null
  returnForm?: () => void
  setFilterAttribute?: (value: string) => void
}
export function Form({
  dataSocioContrato,
  returnForm,
  setFilterAttribute
}: IFormProps): JSX.Element {
  const { socios } = UseSocios()
  const { setContratoId, setContratoCodigo, socioContratoData, setSocioContratoData } =
    useContratoStore((state) => state)
  const { sectores, reloadRecords: reloadSectores } = UseSectoresContext()
  const [sectoresDisponibles, setSectoresDisponibles] = useState<ISector[] | null>()
  const { reloadRecords } = UseContratosContext()
  const [options, setOptions] = useState<optionSearchBar[] | undefined>(undefined)
  const [socioConsultaId, setSocioConsultaId] = useState<number>()
  const [codigoMedidor, setCodigoMedidor] = useState<string>('')
  const [openModalChangeSocio, setOpenModalChangeSocio] = useState<boolean>(false)
  const [openModalChangeSector, setOpenModalChangeSector] = useState<boolean>(false)
  const [data, setData] = useState<IContratoSocioContrato | null | undefined>(socioContratoData)
  useEffect(() => {
    if (socios) {
      setOptions(
        socios.map((socio, index) => {
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
    setSectoresDisponibles(sectores)
  }, [sectores])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<IContratoSocioContrato>({ resolver: zodResolver(contratoSocioContratoSchema) })
  console.log(errors)
  // useEffect(() => {
  //   console.log('dataSocioContrato updated!')
  //   setData(dataSocioContrato)
  // }, [dataSocioContrato])
  useEffect(() => {
    if (socioContratoData !== null) {
      setData(socioContratoData)
      socioContratoData.contrato.id && setContratoId(socioContratoData.contrato.id)
      setContratoCodigo(socioContratoData.contrato.codigo)
    } else {
      setData(null)
    }
  }, [socioContratoData])
  useEffect(() => {
    if (data && data !== null) {
      console.log('Data isnt null: ', data)
      Object.keys(new Object(data)).forEach((key) => {
        setValue(key as keyof IContratoSocioContrato, (data as any)[key])
        if (data?.socio?.id) setValue('sociosId', data?.socio.id)
        setValue('contrato.barrio', data.contrato.sector.barrio)
        setValue('contrato.sectoresId', data.contrato.sector.id)
        // Parsear prioridad de contrato Si=Principal No=Secundario
        setValue(
          'contrato.principalSn',
          data.contrato.principalSn === 'Si' ? 'Principal' : 'Secundario'
        )
      })
      if (data.contrato.medidor && data.contrato.medidor.length > 0) {
        const dataMedidor: IMedidor | undefined = data.contrato.medidor.find(
          (medidor) => medidor.estado === 'Activo'
        )
        setCodigoMedidor(dataMedidor?.codigo || '')
      }
      // loadFormData(data)
    } else {
      console.log('Resetting values')
      reset(undefined, { keepDefaultValues: false })
      setValue('contrato.fecha', fechaActual())
      setValue('fechaContratacion', fechaActual())
      setValue('estado', 'Activo')
      setValue('contrato.medidorSn', 'No')
      setValue('contrato.principalSn', 'Principal')
      setCodigoMedidor('')
    }
  }, [data, dataSocioContrato, reset, setValue])
  const { handleSubmit: handleSubmitWithSubmit, isSubmitting } =
    useSubmitForm<IContratoSocioContrato>({
      onSubmit: async (values) => {
        const action = data ? updateContrato : createContrato
        await action(values, data?.contrato.id || '')
          // await action()
          .then(() => {
            const message = data ? 'Actualizaste' : 'Creaste'
            toast.success(`¡${message} un contrato con éxito!`, {
              className: 'notify-success'
            })
            reloadRecords()
            reloadSectores()
            returnForm ? returnForm() : reset(undefined, { keepDefaultValues: false })
            setValue('contrato.fecha', fechaActual())
            setValue('fechaContratacion', fechaActual())
            setValue('estado', 'Activo')
            setValue('contrato.medidorSn', 'No')
            setValue('contrato.principalSn', 'Principal')
          })
          .catch((error) => {
            toast.error(error.message, { className: 'notify-error' })
          })
      }
    })
  const activoOptions = [
    {
      value: 'Activo',
      label: 'Activo'
    },
    { value: 'Inactivo', label: 'Inactivo' }
  ]
  const onSubmit = (formData: IContratoSocioContrato): void => {
    handleSubmitWithSubmit(formData)
  }
  const handleCancel = (): void => {
    reset(undefined, { keepDefaultValues: false })
    setValue('contrato.fecha', fechaActual())
    setValue('fechaContratacion', fechaActual())
    setValue('estado', 'Activo')
    setValue('contrato.medidorSn', 'No')
    setValue('contrato.principalSn', 'Principal')
    returnForm && returnForm()
    // setFilterAttribute && setFilterAttribute('')
  }

  const handleChangeBarrio = (e: any): void => {
    const option: HTMLOptionElement = e.target.options[e.target.selectedIndex]
    if (option.value !== '0') {
      const sectoresId = option.getAttribute('data-id')
      const abrev = option.getAttribute('data-codigo')
      const numero = option.getAttribute('data-numero-socios')
      // Si estamos actualizando preguntar si se desea cambiar el codigo de contrato
      if (abrev && numero && sectoresId) {
        if (data) {
          if (option.value !== data.contrato.barrio) {
            const confirmDialogProps: ConfirmDialogProps = {
              title: '¿Quieres cambiar el barrio y código del contrato?',
              text: 'No podras revertir esta acción',
              onConfirm: () => {
                setValue('contrato.codigo', generateCodigo(abrev, parseInt(numero) + 3 + ''))
                setValue('contrato.barrio', option.value)
              },
              beforeConfirmTitle: '¡Nuevo código generado!',
              onCancel: () => {
                setValue('contrato.codigo', data.contrato.codigo)
                setValue('contrato.barrio', data.contrato.barrio)
              }
            }
            ConfirmDialog(confirmDialogProps)
          } else {
            console.log('Datos originales')
            setValue('contrato.codigo', data.contrato.codigo)
            setValue('contrato.barrio', data.contrato.barrio)
          }
        } else {
          setValue('contrato.codigo', generateCodigo(abrev, parseInt(numero) + 1 + ''))
          setValue('contrato.barrio', option.value)
          setValue('contrato.sectoresId', parseInt(sectoresId))
        }
      }
    }
  }
  const consultaContratosAnteriores = async (socioId: number): Promise<void> => {
    setSocioConsultaId(socioId)
    const contratosBySocio = await getContratosBySocio(socioId)
    let sorteableAttribute
    if (contratosBySocio.length > 0) {
      sorteableAttribute = contratosBySocio[0].socio?.cedulaPasaporte
      const htmlToDialog = `        <div class='html-swal-center'>
          <table>
            <thead>
              <th>Código</th>
              <th>Sector</th>
              <th>Medidor</th>
              <tbody>
                ${contratosBySocio.map(
                  (contratoSocio) =>
                    `<tr key=${socioConsultaId}>
                    <td>${contratoSocio.contrato.codigo}</td>
                    <td>${contratoSocio.contrato.barrio}</td>
                    <td>${contratoSocio.contrato.medidorSn}</td>
                    </tr>`
                )}
              </tbody>
            </thead>
          </table>
        </div>`
      const informDialogProps: InformDialogProps = {
        icon: 'info',
        title: 'Este socio ya registra contratos Anteriores',
        html: htmlToDialog,
        showConfirmButton: true,
        confirmButtonText: 'Mostrar en tabla',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Aceptar',
        cancelButtonColor: '#4071b3',
        onConfirmAction: setFilterAttribute
          ? (): void => setFilterAttribute(sorteableAttribute)
          : (): null => {
              return null
            }
        // Haciendo uso de un contexto
        // onConfirmAction: () => setFilter(sorteableAttribute)
      }
      InformDialog(informDialogProps)
      setValue('contrato.principalSn', 'Secundario')
    } else {
      setValue('contrato.principalSn', 'Principal')
    }
  }
  const handleClickChangeSocio = (tf: boolean): void => {
    setOpenModalChangeSocio(tf)
  }
  const handleClickChangeSector = (tf: boolean): void => {
    setOpenModalChangeSector(tf)
  }
  const beforeChangeSocioSector = async (): Promise<void> => {
    handleClickChangeSocio(false)
    handleClickChangeSector(false)
    reloadSectores()
    // data && data.contrato.id && setData(await getContratoByContrato(+data.contrato.id))
    if (data && data.contrato.id) {
      console.log('Actualizando data')
      // setData(await getContratoByContrato(+data.contrato.id))
      // setContratoId(data.contrato.id)
      // setContratoCodigo(data.contrato.codigo)
      setSocioContratoData(await getContratoByContrato(+data.contrato.id))
    }
    reloadRecords()
  }

  return (
    <>
      {data && data.id && data.socio && (
        <WithChildrenModal
          isOpen={openModalChangeSocio}
          externalHandle={handleClickChangeSocio}
          title="Cambiar Socio del Contrato"
        >
          <FormChangeSocio
            socioActual={data?.socio}
            contratacionId={data?.id}
            beforeSUbmit={beforeChangeSocioSector}
          />
        </WithChildrenModal>
      )}
      {data && data.id && data.socio && (
        <WithChildrenModal
          isOpen={openModalChangeSector}
          externalHandle={handleClickChangeSector}
          title="Cambiar Sector del Contrato"
        >
          <FormChangeSector
            sectorActual={data.contrato.sector.barrio}
            idSectorActual={data.contrato.sector.id}
            beforeSubmit={beforeChangeSocioSector}
          />
        </WithChildrenModal>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="Formulario ">
        <div className="content">
          <>
            <div className="divider">
              <p>Socio</p>
              <IoManOutline />
            </div>
            {/*Selector de socios*/}
            <div className="input-group search-bar">
              <SearchBar
                options={options}
                placeholder="Selecciona un socio"
                // handleChange={handleChange}
                disabled={data ? true : false}
                control={control}
                name="sociosId"
                onChangeActions={consultaContratosAnteriores}
              />
              {errors.sociosId?.message && <p>{errors.sociosId.message}</p>}
            </div>
            {/* Fecha contratacion */}
            <div className="input-group type-google">
              <input
                type="date"
                placeholder=""
                id="fechaContratacion"
                {...register('fechaContratacion')}
              />
              <label htmlFor="fechaContratacion">Fecha Contratación</label>
              {errors.fechaContratacion?.message && <p>{errors.fechaContratacion.message}</p>}
            </div>
            {/*Estado de contratacion*/}
            <div className="input-group type-google">
              <label htmlFor="estadoContratacion" className="select">
                Estado contratación
              </label>
              <input id="estadoContratacion" required {...register('estado')} readOnly />
              {errors.estado?.message && <p>{errors.estado.message}</p>}
            </div>
            {/* Botton para el cambio de socio */}
            {data && (
              <div className="input-group type-google">
                <button
                  className="middle-button"
                  type="button"
                  onClick={() => handleClickChangeSocio(true)}
                >
                  <PiUserSwitch />
                  Cambiar Socio
                </button>
              </div>
            )}
            <div className="divider">
              <p>Contrato</p>
              <LiaFileContractSolid />
            </div>
            {/* Feccha de contrato */}
            <div className="input-group type-google">
              <input type="date" placeholder="" id="fecha" {...register('contrato.fecha')} />
              <label htmlFor="fecha">Fecha del contrato</label>
              {errors.contrato?.fecha?.message && <p>{errors.contrato.fecha.message}</p>}
            </div>
            {/*Estado del contrato*/}
            <div className="input-group type-google">
              <label htmlFor="estado" className="select">
                Estado del contrato
              </label>
              <select id="estado" required {...register('contrato.estado')}>
                {activoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.contrato?.estado?.message && <p>{errors.contrato.estado.message}</p>}
            </div>
            {/*Prioridad del contrato*/}
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="principalSn"
                required
                readOnly
                {...register('contrato.principalSn')}
              />
              <label htmlFor="principalSn">Prioridad de contrato</label>
              {errors.contrato?.principalSn?.message && (
                <p>{errors.contrato.principalSn.message}</p>
              )}
            </div>
            <div className="divider">
              <p>Sector</p>
              <TfiMapAlt />
            </div>
            {/* Barrio */}
            <div className="input-group type-google">
              <label htmlFor="barrio" className="select">
                Barrio
              </label>
              <select
                required
                {...register('contrato.barrio')}
                id="barrio"
                onChange={(e) => handleChangeBarrio(e)}
                disabled={data ? true : false}
              >
                <option value="0">Selecciona el barrio</option>
                {sectoresDisponibles?.map((option) => (
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
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="sectoresId"
                readOnly
                required
                {...register('contrato.sectoresId')}
              />
              <label htmlFor="sectoresId">Id del sector</label>
              {errors.contrato?.codigo?.message && <p>{errors.contrato.codigo?.message}</p>}
            </div>
            {/* {Codigo del contrato} */}
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="codigo"
                readOnly
                required
                {...register('contrato.codigo')}
              />
              <label htmlFor="codigo">Código del contrato</label>
              {errors.contrato?.codigo?.message && <p>{errors.contrato.codigo?.message}</p>}
            </div>
            {/* Botton para el cambio de sector */}
            {data && (
              <div className="input-group type-google">
                <button
                  className="middle-button"
                  type="button"
                  onClick={() => handleClickChangeSector(true)}
                >
                  <TbExchange />
                  Cambiar Sector
                </button>
              </div>
            )}
            <div className="divider">
              <p>Medidor</p>
              <FaCloudscale />
            </div>
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="medidorSn"
                readOnly
                required
                {...register('contrato.medidorSn')}
              />
              <label htmlFor="medidorSn">Contrato con medidor</label>
              {errors.contrato?.medidorSn?.message && <p>{errors.contrato.medidorSn.message}</p>}
            </div>
            <div className="input-group type-google">
              <input type="text" placeholder="" readOnly required value={codigoMedidor} />
              <label htmlFor="codigo">Código del medidor</label>
            </div>

            <div className="divider">
              <p>Ubicación</p>
              <PiMapPinArea />
            </div>

            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="callePrincipal"
                {...register('contrato.callePrincipal')}
              />
              <label htmlFor="callePrincipal">Calle principal</label>
              {errors.contrato?.callePrincipal?.message && (
                <p>{errors.contrato.callePrincipal.message}</p>
              )}
            </div>
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="calleSecundaria"
                {...register('contrato.calleSecundaria')}
              />
              <label htmlFor="calleSecundaria">Calle secundaria</label>
              {errors.contrato?.calleSecundaria?.message && (
                <p>{errors.contrato.calleSecundaria.message}</p>
              )}
            </div>
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="numeroCasa"
                {...register('contrato.numeroCasa')}
              />
              <label htmlFor="numeroCasa">Número de casa</label>
              {errors.contrato?.numeroCasa?.message && <p>{errors.contrato.numeroCasa.message}</p>}
            </div>
            <div className="input-group type-google">
              <input
                type="text"
                placeholder=""
                id="referencia"
                required
                {...register('contrato.referencia')}
              />
              <label htmlFor="referencia">Referencia</label>
              {errors.contrato?.referencia?.message && <p>{errors.contrato.referencia.message}</p>}
            </div>
          </>
        </div>
        <div className="buttons">
          <button type="submit" disabled={isSubmitting}>
            {/* <TfiSaveAlt /> */}
            Guardar
          </button>
          <button className="cancel" type="button" onClick={handleCancel} disabled={isSubmitting}>
            {/* <MdOutlineCancelPresentation /> */}
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}
