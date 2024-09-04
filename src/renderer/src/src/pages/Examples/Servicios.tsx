/* eslint-disable no-unused-labels */
//import { espectre, p1, p2, p3, p4, p5 } from "../../assets";
// import { Search } from "semantic-ui-react";
import { useEffect, useState } from "react";
import {
  SearchBar,
  optionSearchBar,
} from "../../components/SearchBar/SearchBar";
import { UseSocios } from "../../context/socios.context";
import "./Servicios.scss";
export function Example() {
  // const { socios } = UseSocios();
  // const [options, setOptions] = useState<optionSearchBar[]>();
  // useEffect(() => {
  //   if (socios) {
  //     setOptions(
  //       socios.map((socio) => ({
  //         value: socio.id,
  //         label: socio.primerApellido,
  //         header: `${socio.primerApellido} ${socio.segundoApellido} ${socio.primerNombre}`,
  //         subtitle: socio.cedulaPasaporte,
  //         text: socio.correo,
  //         data: socio,
  //       }))
  //     );
  //   }
  // }, [socios]);

  return (
    <>
      <h1>Barra de busqueda</h1>
      {/* <SearchBar options={options} /> */}
    </>
  );
}
