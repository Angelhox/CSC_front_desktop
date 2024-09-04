/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import '../../scss/commons/forms.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { TfiSaveAlt } from 'react-icons/tfi'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import {
  // contratoMedidorEschema,
  contratoSchema,
  contratoSocioContratoSchema
} from '../../validations/contrato-schema'
import { FaCloudscale } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { IoManOutline } from 'react-icons/io5'
import { LiaFileContractSolid } from 'react-icons/lia'
import {
  IContrato,
  IContratoMedidor,
  IContratoSocioContrato,
  ISocioContrato
} from '../../Interfaces/Contratos/contratos.interface'
import { ReactHTML, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { UseContratosContext } from '../../context/contratos.context'
import {
  createContrato,
  getContratos,
  getContratosBySocio,
  updateContrato
} from '../../api/Contratos/contratos.service'
import useSubmitForm from '../../api/commons/useSubmitForm'
import { SearchBar, optionSearchBar } from '../../components/SearchBar/SearchBar'
import { UseSocios } from '../../context/socios.context'
import { fechaActual } from '../../functions/commons/fechas'
import { UseSectoresContext } from '../../context/sectores.context'
import { generateCodigo } from './functions'
import { UseServiciosContext } from '../../context/servicios.context'
import { useContratoStore } from '../../store/contratos'
import useApi from '@renderer/src/api/commons/useApi'
import {
  InformDialog,
  InformDialogProps
} from '@renderer/src/components/Shared/Dialogs/InformDialog'
import { IMedidor } from '@renderer/src/Interfaces/Medidores/medidores.interface'
// type Inputs = IContratoMedidor
interface IFormProps {
  data?: IContratoSocioContrato | null
  returnForm?: () => void
  setFilterAttribute?: (value: string) => void
}
export function Form({ data, returnForm, setFilterAttribute }: IFormProps): JSX.Element {
  const { socios } = UseSocios()
  const { servicios } = UseServiciosContext()
  const clearContratoData = useContratoStore((state) => state.clearContratoData)
  const { sectores } = UseSectoresContext()
  const { reloadRecords } = UseContratosContext()
  const [options, setOptions] = useState<optionSearchBar[] | undefined>(undefined)
  const [socioConsultaId, setSocioConsultaId] = useState<number>()
  const [codigoMedidor, setCodigoMedidor] = useState<string>('')
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

  const {
    register,
    handleSubmit,
    setValue,

    reset,
    control,
    formState: { errors }
  } = useForm<IContratoSocioContrato>({ resolver: zodResolver(contratoSocioContratoSchema) })
  console.log(errors)
  useEffect(() => {
    if (data && data !== null) {
      console.log('Data isnt null: ', data)
      Object.keys(new Object(data)).forEach((key) => {
        setValue(key as keyof IContratoSocioContrato, (data as any)[key])
        console.log('Fecha contratacion: ', data.fechaContratacion)
        if (data?.socio?.id) setValue('sociosId', data?.socio.id)
        // Parse prioridad de contrato Si=Principal No=Secundario
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
    }
  }, [data, reset, setValue])
  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting
  } = useSubmitForm<IContratoSocioContrato>({
    onSubmit: async (values) => {
      const action = data ? createContrato : createContrato
      await action(values)
        .then(() => {
          const message = data ? 'Actualizaste' : 'Creaste'
          toast.success(`¡${message} un contrato con éxito!`, {
            className: 'notify-success'
          })
          reloadRecords()
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
  const onSubmit = (formData: IContratoSocioContrato) => {
    handleSubmitWithSubmit(formData)
  }
  const handleCancel = () => {
    clearContratoData()
    reset(undefined, { keepDefaultValues: false })
    setValue('contrato.fecha', fechaActual())
    setValue('fechaContratacion', fechaActual())
    setValue('estado', 'Activo')
    setValue('contrato.medidorSn', 'No')
    setValue('contrato.principalSn', 'Principal')
    returnForm ? returnForm() : ''
  }

  const handleChangeBarrio = (e: any) => {
    const option: HTMLOptionElement = e.target.options[e.target.selectedIndex]
    if (option.value !== '0') {
      const abrev = option.getAttribute('data-codigo')
      const numero = option.getAttribute('data-numero-socios')
      if (abrev && numero) {
        setValue('contrato.codigo', generateCodigo(abrev, numero))
        // setValue('medidor.codigo', generateCodigo(abrev, numero))
      }
      setValue('contrato.barrio', option.value)
    }
  }
  const consultaContratosAnteriores = async (socioId: number) => {
    console.log('Consultando...')
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
                    `<tr key=${contratoSocio.contrato.id}>
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
          ? () => setFilterAttribute(sorteableAttribute)
          : () => {
              return null
            }
      }
      InformDialog(informDialogProps)
      setValue('contrato.principalSn', 'Secundario')
    } else {
      setValue('contrato.principalSn', 'Principal')
    }
  }
  return (
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
              readOnly
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
          <div className="divider">
            <p>Contrato</p>
            <LiaFileContractSolid />
          </div>
          {/* Primer nombre */}
          <div className="input-group type-google">
            <input type="date" placeholder="" id="fecha" {...register('contrato.fecha')} />
            <label htmlFor="fecha">Fecha del contrato</label>
            {errors.contrato?.fecha?.message && <p>{errors.contrato.fecha.message}</p>}
          </div>

          <div className="input-group type-google">
            <label htmlFor="barrio" className="select">
              Barrio
            </label>
            <select
              required
              {...register('contrato.barrio')}
              id="barrio"
              onChange={(e) => handleChangeBarrio(e)}
            >
              <option value="0">Selecciona el barrio</option>
              {sectores?.map((option) => (
                <option
                  key={option.id}
                  value={option.barrio}
                  data-numero-socios={option.numeroSocios}
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
              id="codigo"
              readOnly
              required
              {...register('contrato.codigo')}
            />
            <label htmlFor="codigo">Código del contrato</label>
            {errors.contrato?.codigo?.message && <p>{errors.contrato.codigo?.message}</p>}
          </div>

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
            {errors.contrato?.principalSn?.message && <p>{errors.contrato.principalSn.message}</p>}
          </div>
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
            <IoLocationOutline />
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
          <TfiSaveAlt />
          Guardar
        </button>
        <button className="cancel" type="button" onClick={handleCancel} disabled={isSubmitting}>
          <MdOutlineCancelPresentation />
          Cancelar
        </button>
      </div>
    </form>
  )
}
