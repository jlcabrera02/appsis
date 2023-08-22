import { useState } from "react";
import { TableShowTesis } from "../components/Table";
import InputSelectCarreras from "../components/InputSelectCarreras";

interface bodyForm {
  titulo: string;
  carrera: string;
}

const BuscarTesis = () => {
  const [filtros, setFiltros] = useState({ titulo: "", carrera: "" });
  const buscarTitulo = (e: any) => {
    e.preventDefault();
    const body: bodyForm = {
      titulo: e.target.titulo.value,
      carrera: e.target.carrera.value,
    };

    setFiltros(body);
  };

  return (
    <div className="container">
      <form onSubmit={buscarTitulo} className="row">
        <div className="col-sm-5 col-12 d-flex gap-2 mb-3">
          <label htmlFor="buscar">Busca titulo</label>
          <input
            type="text"
            name="titulo"
            className="form-control border border-primary"
            placeholder='Ejemplo: "Construcción de una App de tesis para facilitar el acceso a todas y todos los estudiantes"'
          />
        </div>
        <div className="col-sm-5 col-12 d-flex gap-2 mb-3">
          <label>Seleccionar Carreras</label>
          <InputSelectCarreras name="carrera" />
        </div>
        <div className="col-sm-2 col-12 d-flex mb-3">
          <button className="btn btn-secondary w-100">Buscar</button>
        </div>
      </form>
      <TableShowTesis filtros={filtros} />
    </div>
  );
};

export default BuscarTesis;
