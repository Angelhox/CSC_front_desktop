/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "./Form.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { socioSchema } from "../../validations/socioSchema";
type Inputs = {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  cedulaPasaporte: string;
  fechaNacimiento: string;
  telefonoMovil: string;
  telefonoFijo: string;
  correo: string;
  provincia: string;
  canton: string;
  parroquia: string;
  barrio: string;
  callePrincipal: string;
  calleSecundaria: string;
  numeroCasa: string;
  referencia: string;
};
export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(socioSchema) });
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="Formulario"
    >
      <div className="content">
        {/* Primer nombre */}
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="primerNombre"
            required
            {...register("primerNombre")}
          />
          <label htmlFor="primerNombre">Primer nombre</label>
          {errors.primerNombre?.message && (
            <p>{errors.primerNombre?.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="segundoNombre"
            {...register("segundoNombre")}
          />
          <label htmlFor="segundoNombre">Segundo nombre</label>
          {errors.segundoNombre?.message && (
            <p>{errors.segundoNombre.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="primerApellido"
            required
            {...register("primerApellido")}
          />
          <label htmlFor="primerApellido">Primer apellido</label>
          {errors.primerApellido?.message && (
            <p>{errors.primerApellido.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="segundoApellido"
            {...register("segundoApellido")}
          />
          <label htmlFor="segundoApellido">Segundo apellido</label>
          {errors.segundoApellido?.message && (
            <p>{errors.segundoApellido.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="cedulaPasaporte"
            required
            {...register("cedulaPasaporte")}
          />
          <label htmlFor="cedulaPasaporte">Cédula | Pasaporte</label>
          {errors.cedulaPasaporte?.message && (
            <p>{errors.cedulaPasaporte.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaNacimiento"
            required
            {...register("fechaNacimiento")}
          />
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          {errors.fechaNacimiento?.message && (
            <p>{errors.fechaNacimiento.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="telefonoMovil"
            {...register("telefonoMovil")}
          />
          <label htmlFor="telefonoMovil">Teléfono móvil</label>
          {errors.telefonoMovil?.message && (
            <p>{errors.telefonoMovil.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="telefonoFijo"
            {...register("telefonoFijo")}
          />
          <label htmlFor="telefonoFijo">Teléfono fijo</label>
          {errors.telefonoFijo?.message && <p>{errors.telefonoFijo.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="email"
            placeholder=""
            id="correo"
            {...register("correo")}
          />
          <label htmlFor="correo">Correo</label>
          {errors.correo?.message && <p>{errors.correo.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="provincia"
            required
            {...register("provincia")}
          />
          <label htmlFor="provincia">Provincia</label>
          {errors.provincia?.message && <p>{errors.provincia.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="canton"
            required
            {...register("canton")}
          />
          <label htmlFor="canton">Canton</label>
          {errors.canton?.message && <p>{errors.canton.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="parroquia"
            required
            {...register("parroquia")}
          />
          <label htmlFor="parroquia">Parroquia</label>
          {errors.parroquia?.message && <p>{errors.parroquia.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="barrio"
            required
            {...register("barrio")}
          />
          <label htmlFor="barrio">Barrio</label>
          {errors.barrio?.message && <p>{errors.barrio.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="callePrincipal"
            {...register("callePrincipal")}
          />
          <label htmlFor="callePrincipal">Calle principal</label>
          {errors.callePrincipal?.message && (
            <p>{errors.callePrincipal.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="calleSecundaria"
            {...register("calleSecundaria")}
          />
          <label htmlFor="calleSecundaria">Calle secundaria</label>
          {errors.calleSecundaria?.message && (
            <p>{errors.calleSecundaria.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="numeroCasa"
            {...register("numeroCasa")}
          />
          <label htmlFor="numeroCasa">Número de casa</label>
          {errors.numeroCasa?.message && <p>{errors.numeroCasa.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="referencia"
            required
            {...register("referencia")}
          />
          <label htmlFor="referencia">Referencia</label>
          {errors.referencia?.message && <p>{errors.referencia.message}</p>}
        </div>
      </div>
      <div className="">
        <button type="submit">Guardar</button>
        <button className="cancel">Cancelar</button>
      </div>
    </form>
  );
}
