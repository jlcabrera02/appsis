import { useState } from "react";
import { TableShowTesis } from "../components/Table";
import InputSelectCarreras from "../components/InputSelectCarreras";
import InputSelectCategorias from "../components/InputSelectCategorias";
// import InputSelectOpciones from "../components/InputSelectOpciones";

interface bodyForm {
  titulo: string;
  idcarrera: string;
  idcategoria: string;
}

const BuscarTesis = () => {
  const [filtros, setFiltros] = useState({
    titulo: "",
    idcarrera: "",
    idcategoria: "",
  });
  const buscarTitulo = (e: any) => {
    e.preventDefault();
    const body: bodyForm = {
      titulo: e.target.titulo.value,
      idcarrera: e.target.idcarrera.value,
      idcategoria: e.target.idcategoria.value,
    };

    setFiltros(body);
  };

  console.log(filtros);

  return (
    <div className="container mt-3">
      <form onSubmit={buscarTitulo} className="row">
        <div className="col-xl-4 col-12 d-flex gap-2 mb-3">
          <label htmlFor="buscar">Busca titulo</label>
          <input
            type="text"
            name="titulo"
            className="form-control border border-primary"
            placeholder='Ejemplo: "Construcción de una App de tesis para facilitar el acceso a todas y todos los estudiantes"'
          />
        </div>
        <div className="col-xl-3 col-12 d-flex gap-2 mb-3">
          <label>Seleccionar Carreras</label>
          <InputSelectCarreras name="idcarrera" />
        </div>
        <div className="col-xl-3 col-12 d-flex gap-2 mb-3">
          <label>Seleccionar Categoría</label>
          <InputSelectCategorias name="idcategoria" />
        </div>
        {/* <div className="col-sm-2 col-12 d-flex gap-2 mb-3">
          <label>Seleccionar Opción</label>
          <InputSelectOpciones name="idcarrera" />
        </div> */}
        <div className="col-xl-2 col-12 d-flex mb-3">
          <button className="btn btn-secondary w-100">Buscar</button>
        </div>
      </form>
      <TableShowTesis filtros={filtros} />
    </div>
  );
};

export default BuscarTesis;
