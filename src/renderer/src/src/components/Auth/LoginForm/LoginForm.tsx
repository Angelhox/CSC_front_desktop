/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./LoginForm.scss";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues, validationSchema } from "./loginForm.data";
import { Auth, IUserCredentials } from "../../../api/Auth/auth";
import { useAuthStore } from "../../../store/auth";
import { toast } from "sonner";
import useSubmitForm from "../../../api/commons/useSubmitForm";
import { IEmpleadoUsuario } from "../../../Interfaces/Usuarios/usuarios.interface";
const auth = new Auth();
interface Props {
  goBack: () => void;
}
export function LoginForm({ goBack }: Props) {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const logOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting,
  } = useSubmitForm<IUserCredentials>({
    async onSubmit(values) {
      await auth
        .login(values)
        .then(async (response) => {
          setToken(response.token);
          const profile = await auth.profile();
          setProfile(profile);
          navigate("/home");
          toast.success(`Bienvenido ${profile.empleado.primerNombre}`, {
            className: "notify-success",
          });
        })
        .catch((error) => {
          logOut();
          toast.error(error.message, { className: "notify-error" });
        });
    },
  });
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      await handleSubmitWithSubmit(formValue);
    },
  });

  const onShowHiddenPassword = (): void =>
    setShowPassword((prevState) => !prevState);
  return (
    <div className="LoginForm">
      <h1>Inicio de sesión</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="usuario"
          type="text"
          placeholder="Usuario"
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.usuario}
          error={formik.errors.usuario}
        />
        {/* {formik.errors.usuario && <p>{formik.errors.usuario}</p>} */}
        <Form.Input
          name="clave"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHiddenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.clave}
          error={formik.errors.clave}
        />
        <Form.Button type="submit" fluid>
          Continuar
        </Form.Button>
      </Form>
      <div className="options">
        <p onClick={goBack}>Volver</p>
      </div>
    </div>
  );
}
