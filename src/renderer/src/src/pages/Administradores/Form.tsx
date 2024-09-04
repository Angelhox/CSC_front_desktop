/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import '../../scss/commons/forms.scss'
import './form.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmpleadoUsuarioSchema, usuarioSchema } from '../../validations/usuarioSchema'
import { TfiSaveAlt } from 'react-icons/tfi'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { UseUsuariosContext } from '../../context/usuarios.context'
import useSubmitForm from '../../api/commons/useSubmitForm'
import { IEmpleadoUsuario } from '../../Interfaces/Usuarios/usuarios.interface'
import { createUsuario } from '../../api/Usuarios/usuario.service'
import {
  IOption,
  SelectCharged
} from '../../components/Shared/Select/FormatReports/SelectCharged/SelectCharged'
import { UseCargosContext } from '../../context/cargos.context'
import { UseRolesContext } from '../../context/roles.context'
import { useState } from 'react'
import { toast } from 'sonner'
type Inputs = IEmpleadoUsuario
export function Form() {
  const [showPassword, setShowPassword] = useState(false)
  const { reloadRecords } = UseUsuariosContext()
  const { reloadRecords: reloadCargos, cargos } = UseCargosContext()
  const { reloadRecords: reloadRoles, roles } = UseRolesContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({ resolver: zodResolver(EmpleadoUsuarioSchema) })
  console.log(errors)
  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting
  } = useSubmitForm<IEmpleadoUsuario>({
    async onSubmit(values) {
      await createUsuario(values)
        .then(() => {
          toast.success('Creaste un nuevo administrador', {
            className: 'notify-success'
          })
          reloadRecords()
        })
        .catch((error) => {
          toast.error(error.message, { className: 'notify-error' })
        })
    }
  })
  const onSubmit = (data: Inputs) => {
    console.log(data)
    handleSubmitWithSubmit(data)
  }
  // Fake data

  const options: IOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]
  function showPasswordHandle() {
    setShowPassword(!showPassword)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Formulario">
      <div className="content">
        {/* Primer nombre */}
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="primerNombre"
            required
            {...register('empleado.primerNombre')}
          />
          <label htmlFor="primerNombre">Primer nombre</label>
          {errors.empleado?.primerNombre?.message && (
            <p>{errors.empleado?.primerNombre?.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="segundoNombre"
            {...register('empleado.segundoNombre')}
          />
          <label htmlFor="segundoNombre">Segundo nombre</label>
          {errors.empleado?.segundoNombre?.message && (
            <p>{errors.empleado?.segundoNombre?.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="primerApellido"
            required
            {...register('empleado.primerApellido')}
          />
          <label htmlFor="primerApellido">Primer apellido</label>
          {errors.empleado?.primerApellido?.message && (
            <p>{errors.empleado?.primerApellido?.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="segundoApellido"
            {...register('empleado.segundoApellido')}
          />
          <label htmlFor="segundoApellido">Segundo apellido</label>
          {errors.empleado?.segundoApellido?.message && (
            <p>{errors.empleado?.segundoApellido?.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="cedulaPasaporte"
            required
            {...register('empleado.cedula')}
          />
          <label htmlFor="cedulaPasaporte">Cédula | Pasaporte</label>
          {errors.empleado?.cedula?.message && <p>{errors.empleado?.cedula.message}</p>}
        </div>

        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="telefono"
            {...register('empleado.telefono')}
            required
          />
          <label htmlFor="telefono">Teléfono móvil</label>
          {errors.empleado?.telefono?.message && <p>{errors.empleado?.telefono.message}</p>}
        </div>

        <div className="input-group type-google">
          <input
            type="email"
            placeholder=""
            id="correo"
            {...register('empleado.correo')}
            required
          />
          <label htmlFor="empleado.correo">Correo</label>
          {errors.empleado?.correo?.message && <p>{errors.empleado?.correo.message}</p>}
        </div>
        <div className="input-group type-google">
          <label htmlFor="usuario" className="select">
            Cargo
          </label>
          <select required {...register('empleado.cargoId')} id="">
            <option value="0">Selecciona un cargo</option>
            {cargos?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.cargo}
              </option>
            ))}
          </select>
          {errors.empleado?.cargoId?.message && <p>{errors.empleado?.cargoId.message}</p>}
        </div>
        <div className="divider">
          <p>Datos del usuario</p>
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaModificacion"
            required
            {...register('usuario.fechaModificacion')}
          />
          <label htmlFor="fechaModificacion">Fecha modificación</label>
          {errors.usuario?.fechaModificacion?.message && (
            <p>{errors.usuario.fechaModificacion.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="usuario"
            required
            {...register('usuario.usuario')}
          />
          <label htmlFor="usuario">Nombre de usuario</label>
          {errors.usuario?.usuario?.message && <p>{errors.usuario.usuario.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=""
            id="clave"
            required
            {...register('usuario.clave')}
          />
          <label htmlFor="clave">Contraseña</label>
          {errors.usuario?.clave?.message && <p>{errors.usuario.clave.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=""
            id="confirmClave"
            required
            {...register('usuario.confirmClave')}
          />
          <label htmlFor="confirmClave">Confirmar Contraseña</label>
          {errors.usuario?.confirmClave?.message && <p>{errors.usuario.confirmClave.message}</p>}
        </div>
        <div className="label-checkbox w-100">
          <input type="checkbox" id="showPassword" onChange={showPasswordHandle} />
          <label htmlFor="showPassword">
            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </label>
        </div>
        <div className="input-group type-google">
          <label htmlFor="usuario" className="select">
            Rol
          </label>
          <select required {...register('usuario.rolId')} id="rolId">
            <option value="0">Selecciona un rol</option>
            {roles?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.rol}
              </option>
            ))}
          </select>
          {errors.usuario?.rolId?.message && <p>{errors.usuario?.rolId.message}</p>}
        </div>
      </div>
      {error && <p className="error-request">{error}</p>}
      <div className="buttons">
        <button type="submit">
          <TfiSaveAlt />
          Guardar
        </button>
        <button className="cancel">
          <MdOutlineCancelPresentation />
          Cancelar
        </button>
      </div>
    </form>
  )
}
