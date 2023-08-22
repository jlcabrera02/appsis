import { useState } from "react";
import { InputSelectCarrerasOrCreate } from "../components/InputSelectCarreras";
import { InputSelectCategoriasOrCreate } from "../components/InputSelectCategorias";
import axios from "../utils/axios";
import { Form } from "react-bootstrap";
import { formatTextoMayusPrimeraLetra } from "../utils/formats";
import { Correct, Error } from "../components/Modals";

const objectAutor = {
  nombre: "",
  apepat: "",
  apemat: "",
  matricula: "",
  carrera: "",
};

const initialData = {
  titulo: "",
  resumen: "",
  autor: objectAutor,
  coautor: null,
  institucion: "",
  carrera: "",
  categoria: "",
};

export const CrearTesis = () => {
  const [file, setFile] = useState(null);
  const [modalOk, setModalOk] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [tesisBody, setTesisBody]: [any, any] = useState(initialData);

  const handle = (e: any) => {
    setTesisBody({ ...tesisBody, [e.target.name]: e.target.value });
  };

  const uploadFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const guardarTesis = async (e: any) => {
    e.preventDefault();
    try {
      const newData = new FormData();

      newData.append("data", JSON.stringify(tesisBody));

      if (file) {
        newData.append("tesis", file);
      }

      await axios.post("tesis/create", newData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTesisBody(initialData);
      setFile(null);
      setModalOk(true);
      setTimeout(() => {
        setModalOk(false);
      }, 600);
    } catch (err) {
      setModalErr(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mb-4">
        <Form onSubmit={guardarTesis}>
          {/* <form className="needs-validation" noValidate onSubmit={}> */}
          <div>
            <h4 className="fw-bold">Datos de la tesis</h4>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Titulo de la tesis</label>
            <input
              type="text"
              className="form-control"
              placeholder="Titulo..."
              name="titulo"
              onChange={handle}
              value={tesisBody.titulo}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Resumen</label>
            <textarea
              name="resumen"
              rows={5}
              className="w-100 form-control"
              placeholder="Resumen..."
              onChange={handle}
              value={tesisBody.resumen}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-between gap-2">
            <div className="flex-grow-1">
              <label className="form-label fw-bold">Institución</label>
              <input
                type="text"
                className="form-control"
                placeholder="intitución..."
                name="institucion"
                onChange={handle}
                value={tesisBody.institucion}
                required
              />
            </div>
            <div className="flex-grow-1">
              <label className="form-label fw-bold">Carrera</label>
              <InputSelectCarrerasOrCreate
                name="carrera"
                placeholder="Carrera..."
                value={tesisBody}
                handle={handle}
              />
            </div>
            <div className="flex-grow-1">
              <label className="form-label fw-bold">Categoria</label>
              <InputSelectCategoriasOrCreate
                name="categoria"
                placeholder="Categoria..."
                value={tesisBody}
                handle={handle}
              />
            </div>
            <div className="flex-grow-1">
              <label className="form-label fw-bold" htmlFor="pdfFile">
                Subir archivo
              </label>
              <input
                type="file"
                className="form-control"
                id="pdfFile"
                accept=".pdf"
                onChange={uploadFile}
                required
              />
            </div>
          </div>
          <hr className="border border-secondary" />
          <div>
            <h4 className="fw-bold">Datos de los autores</h4>
          </div>
          <FormAutor
            tesisBodyState={[tesisBody, setTesisBody]}
            property="autor"
          />
          {!tesisBody.coautor && (
            <button
              className="btn btn-secondary"
              onClick={() =>
                setTesisBody({ ...tesisBody, coautor: objectAutor })
              }
              type="button"
            >
              Añadir coautor
            </button>
          )}
          {tesisBody.coautor && (
            <>
              <FormAutor
                tesisBodyState={[tesisBody, setTesisBody]}
                property="coautor"
              />
              <button
                className="btn btn-danger"
                onClick={() => setTesisBody({ ...tesisBody, coautor: null })}
                type="button"
              >
                Eliminar coautor
              </button>
            </>
          )}
          <div className="d-flex">
            <button className="btn btn-primary m-auto w-25" type="submit">
              Guardar tesis
            </button>
          </div>
        </Form>
      </div>
      <Correct onHide={() => setModalOk(false)} show={modalOk} />
      <Error onHide={() => setModalErr(false)} show={modalErr} />
    </>
  );
};

interface propsAutor {
  tesisBodyState: any;
  property: string;
}

const FormAutor = ({ tesisBodyState, property }: propsAutor) => {
  const [tesisBody, setTesisBody] = tesisBodyState;
  const handle = (e: any) => {
    setTesisBody({
      ...tesisBody,
      [property]: { ...tesisBody[property], [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="mb-3">
      <div className="bg-primary bg-opacity-25 rounded mb-2">
        <span className="text-white fs-5">
          {formatTextoMayusPrimeraLetra(property)}
        </span>
      </div>
      <div className="d-flex gap-2 justify-content-between">
        <div>
          <label className="form-label fw-bold">Matricula</label>
          <input
            type="text"
            className="form-control"
            placeholder="Matricula..."
            onChange={handle}
            name="matricula"
            value={tesisBody[property].matricula}
          />
        </div>
        <div>
          <label className="form-label fw-bold">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre..."
            onChange={handle}
            name="nombre"
            value={tesisBody[property].nombre}
          />
        </div>
        <div>
          <label className="form-label fw-bold">Apellido Paterno</label>
          <input
            type="text"
            className="form-control"
            placeholder="Apellido..."
            onChange={handle}
            name="apepat"
            value={tesisBody[property].apepat}
          />
        </div>
        <div>
          <label className="form-label fw-bold">Apellido Materno</label>
          <input
            type="text"
            className="form-control"
            name="apemat"
            onChange={handle}
            value={tesisBody[property].apemat}
            placeholder="Apellido..."
          />
        </div>
        <div>
          <label className="form-label fw-bold">Carrera</label>
          <InputSelectCarrerasOrCreate
            name="carrera"
            placeholder="Carrera..."
            value={tesisBody[property]}
            handle={handle}
          />
        </div>
      </div>
    </div>
  );
};
