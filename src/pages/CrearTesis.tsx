import { useState } from "react";
import { InputSelectCarrerasOrCreate } from "../components/InputSelectCarreras";
import { InputSelectCategoriasOrCreate } from "../components/InputSelectCategorias";
import axios from "../utils/axios";
import { Form } from "react-bootstrap";
import { Correct, Error } from "../components/Modals";
import { InputSelecOpcionesOrCreate } from "../components/InputSelectOpciones";
import {
  InputSelectEstados,
  InputSelectMunicipio,
} from "../components/InputSelectEstados";
import Loader from "../assets/Loader";

const objectAutor = {
  nombre: "",
  apepat: "",
  apemat: "",
  matricula: "",
  carrera: "",
};

const initialData = {
  id: "",
  titulo: "",
  adquisicion: "",
  ficha: "",
  resumen: "",
  autores: [objectAutor],
  institucion: "",
  carrera: "",
  categoria: "",
  opcion: "",
  fecha: "",
  municipio: "",
  estado: "",
};

export const CrearTesis = ({ data, setDataEdit, actualizador }: any) => {
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState(null);
  const [modalOk, setModalOk] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [tesisBody, setTesisBody]: [any, any] = useState(data || initialData);

  const handle = (e: any) => {
    setTesisBody({ ...tesisBody, [e.target.name]: e.target.value });
  };

  const uploadFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const editarTesis = async () => {
    try {
      await axios.put("/tesis/editar/".concat(tesisBody.id), tesisBody);

      setTesisBody(initialData);
      setFile(null);
      setModalOk(true);
      setTimeout(() => {
        setModalOk(false);
      }, 600);
      setDataEdit("");
      actualizador();
    } catch (err) {
      setModalErr(true);
      console.log(err);
    }
  };

  const guardarTesis = async (e: any) => {
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
      e.target.reset();
    } catch (err) {
      setModalErr(true);
      console.log(err);
    }
  };

  const enviarForm = async (e: any) => {
    setPending(true);
    e.preventDefault();
    if (tesisBody.id) {
      await editarTesis();
    } else {
      await guardarTesis(e);
    }
    setPending(false);
  };

  return (
    <>
      <div className="container mt-4">
        <Form onSubmit={enviarForm} className="mb-3">
          <div>
            <h4 className="fw-bold">Datos de la tesis</h4>
          </div>
          <div className="mb-3 d-flex gap-2">
            <div className="">
              <label className="form-label fw-bold">Ficha</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ficha..."
                name="ficha"
                onChange={handle}
                value={tesisBody.ficha}
                required
              />
            </div>
            <div className="">
              <label className="form-label fw-bold">Adquisición</label>
              <input
                type="text"
                className="form-control"
                placeholder="adquisicion..."
                name="adquisicion"
                onChange={handle}
                value={tesisBody.adquisicion}
                required
              />
            </div>
            <div className="flex-grow-1">
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
              <label className="form-label fw-bold">Opción</label>
              <InputSelecOpcionesOrCreate
                name="opcion"
                placeholder="opcion..."
                value={tesisBody}
                handle={handle}
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
          </div>
          <div className="d-flex justify-content-between gap-2">
            <div className="flex-grow-1">
              <label className="form-label fw-bold">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={tesisBody.fecha}
                onChange={handle}
              />
            </div>
            <div className="flex-grow-1">
              <label className="form-label fw-bold">Estado</label>
              <InputSelectEstados
                name="estado"
                handle={handle}
                value={tesisBody}
              />
            </div>

            <div className="flex-grow-1">
              <label className="form-label fw-bold">Municipio</label>
              <InputSelectMunicipio
                name="municipio"
                handle={handle}
                value={tesisBody}
                estado={tesisBody.estado.estado}
              />
            </div>
            {!tesisBody.id && (
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
            )}
          </div>
          <hr className="border border-secondary" />
          <div>
            <h4 className="fw-bold">Datos de los autores</h4>
          </div>
          {tesisBody.autores.map((autor: any, index: number) => (
            <FormAutor
              key={index}
              // autor={autor}
              tesisBodyState={[tesisBody, setTesisBody]}
              property="autores"
              index={index}
            />
          ))}

          {tesisBody.autores.length < 4 && (
            <button
              className="btn btn-silver"
              type="button"
              onClick={() =>
                setTesisBody({
                  ...tesisBody,
                  autores: [...tesisBody.autores, objectAutor],
                })
              }
            >
              Agregar autor
            </button>
          )}

          <div className="d-flex">
            {!tesisBody.id ? (
              <button
                className="btn btn-primary m-auto w-25"
                type="submit"
                disabled={pending}
              >
                {pending ? <Loader /> : "Guardar tesis"}
              </button>
            ) : (
              <button
                className="btn btn-secondary m-auto w-25"
                type="submit"
                disabled={pending}
              >
                {pending ? <Loader /> : "Editar tesis"}
              </button>
            )}
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
  index: number;
}

const FormAutor = ({ tesisBodyState, property, index }: propsAutor) => {
  const [tesisBody, setTesisBody] = tesisBodyState;
  const handle = (e: any) => {
    setTesisBody({
      ...tesisBody,
      autores: tesisBody.autores.toSpliced(index, 1, {
        ...tesisBody.autores[index],
        [e.target.name]: e.target.value,
      }),
    });
  };

  const eliminar = () => {
    const autores = tesisBody.autores.toSpliced(index, 1);
    setTesisBody({ ...tesisBody, autores });
  };

  return (
    <div className="mb-3">
      <div className="bg-primary bg-opacity-25 rounded mb-2">
        <span className="text-white fs-5">Autor {index + 1}</span>
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
            value={tesisBody[property][index].matricula}
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
            value={tesisBody[property][index].nombre}
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
            value={tesisBody[property][index].apepat}
          />
        </div>
        <div>
          <label className="form-label fw-bold">Apellido Materno</label>
          <input
            type="text"
            className="form-control"
            name="apemat"
            onChange={handle}
            value={tesisBody[property][index].apemat}
            placeholder="Apellido..."
          />
        </div>
        <div>
          <label className="form-label fw-bold">Carrera</label>
          <InputSelectCarrerasOrCreate
            name="carrera"
            placeholder="Carrera..."
            value={tesisBody[property][index]}
            handle={handle}
          />
        </div>
        <div className="d-flex align-items-end">
          <button className="btn btn-delete" type="button" onClick={eliminar}>
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};
