import { Button } from "semantic-ui-react";
import "./AuthOptions.scss";
/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  openLogin: () => void;
}
export function AuthOptions({ openLogin }: Props) {
  return (
    <div className="AuthOptions">
      <h1>Gestión Segura y Eficiente</h1>
      <Button className="login" onClick={openLogin}>
        Inicia Sesion
      </Button>
    </div>
  );
}
