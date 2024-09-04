/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "./Form";
import { Table } from "../../components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import data from "./MOCK_DATA.json";
import { TbDatabaseHeart } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { IMenuActions } from "../../commons/interfaces/menu-actions";
import "./Administradores.scss";
import { useState } from "react";
import { ReportOptions } from "../../components/ReportOptions/ReportOptions";
import { IEmpleadoUsuario } from "../../Interfaces/Usuarios/usuarios.interface";
import { UseUsuariosContext } from "../../context/usuarios.context";
const listTitle = "Administradores";

export function Administradores() {
  const { usuarios: usuarios, loading, error } = UseUsuariosContext();

  const defaultData: IEmpleadoUsuario[] | null = usuarios;
  const columnHelper = createColumnHelper<IEmpleadoUsuario>();
  const columns = [
    columnHelper.accessor("empleado.id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.empleado.primerApellido, {
      id: "primerApellido",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Apellido</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.empleado.primerNombre, {
      id: "primerNombre",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Nombre</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("empleado.cedula", {
      header: () => "Cédula",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("empleado.correo", {
      header: () => <span>Correo</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("rol.rol", {
      header: "Rol",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("rol.rolDescripcion", {
      header: "Descripción",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("usuario", {
      header: "Usuario",
      footer: (info) => info.column.id,
    }),
    // columnHelper.accessor("address", {
    //   header: "Address",
    //   footer: (info) => info.column.id,
    // }),
  ];
  const [typeActions, setTypeActions] = useState<string>("Form");
  const [titleActions, setTitleActions] = useState<string>(
    "+ Agregar un nuevo administrador"
  );
  const openForm = (): void => {
    setTypeActions("Form");
    setTitleActions("+ Agregar un nuevo administrador");
  };
  const openReport = () => {
    setTypeActions("Report");
    setTitleActions("Genera un reporte");
  };
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: TbDatabaseHeart,
      title: "Reportes",
      onClick: openReport,
    },
    {
      id: 2,
      icon: IoPersonAddOutline,
      title: "Agregar",
      onClick: openForm,
    },
  ];
  const renderActions = () => {
    if (typeActions === "Report") {
      // return <ReportOptions />;
      return <ReportOptions data={Object.keys(data[0])} />;
    }
    return <Form />;
  };
  if (!usuarios) {
    return null;
  }
  return (
    <div className="Container">
      <div className="container-list">
        {/* {JSON.stringify(defaultData)} */}
        <Table
          columns={columns}
          defaultData={defaultData}
          menuActions={menuActions}
          showMenuActions={true}
          listTitle={listTitle}
          loading={loading}
          error={error}
        />
      </div>
      <div className="container-actions">
        <div className="actions">
          <section className="header">
            <h2>{titleActions}</h2>
          </section>
          <section className="body">
            {/* <Form /> */}
            {renderActions()}
          </section>
        </div>
      </div>
    </div>
  );
}
