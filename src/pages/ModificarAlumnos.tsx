import axios from "../utils/axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGetData from "../hooks/useGetData";
import { InputSelectCarrerasOrCreate } from "../components/InputSelectCarreras";
import { Correct, Error, ModalConfirmDelElement } from "../components/Modals";

export const ModificarAlumnos = () => {
  const [statusReq, setStatusReq] = useState({ sucess: false, error: false });
  const [actualizador, setActualizador] = useState(false);
  const [body, setBody] = useState({
    matriculaV: "",
    nombre: "",
    matricula: "",
    apepat: "",
    apemat: "",
    carrera: "",
  });
  const [confirmDel, setConfimDel] = useState({ show: false, id: "" });
  const { data, isPending } = useGetData({
    baseUrl: "/alumnos/obtener",
    actualizador,
  });
  const initStatus = () => setStatusReq({ sucess: false, error: false });
  const okStatus = () => setStatusReq({ sucess: true, error: false });
  const falseStatus = () => setStatusReq({ sucess: false, error: true });

  const guardar = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/Alumnos/insertar", body);
      setActualizador(!actualizador);
      setBody({
        matriculaV: "",
        nombre: "",
        matricula: "",
        apepat: "",
        apemat: "",
        carrera: "",
      });
      okStatus();
    } catch (err) {
      falseStatus();
      console.log(err);
    }
  };

  const editar = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`/Alumnos/editarXmatriculas/${body.matriculaV}`, body);
      setActualizador(!actualizador);
      setBody({
        matriculaV: "",
        nombre: "",
        matricula: "",
        apepat: "",
        apemat: "",
        carrera: "",
      });
      okStatus();
    } catch (err) {
      falseStatus();
      console.log(err);
    }
  };

  const eliminarAlumno = async (id: any) => {
    try {
      await axios.delete(`/Alumnos/eliminarXmatricula/${id}`);
      setActualizador(!actualizador);
      okStatus();
    } catch (err) {
      falseStatus();
      console.log(err);
    }
    setConfimDel({ show: false, id: "" });
  };

  const res = data ? data["response"] : [];

  const handle = (e: any) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  console.log(body);

  return (
    <div className="container">
      <Link to="/crear/tesis" className="btn btn-primary mb-3">
        <i className="fa-solid fa-arrow-left" />
      </Link>
      <form onSubmit={!body.matriculaV ? guardar : editar} className="mb-3">
        <div className="row">
          <div className="col-2">
            <label className="form-label fw-bold">Matricula</label>
            <input
              type="text"
              className="form-control"
              placeholder="Matricula..."
              onChange={handle}
              name="matricula"
              value={body.matricula}
            />
          </div>
          <div className="col-2">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre..."
              onChange={handle}
              name="nombre"
              value={body.nombre}
            />
          </div>
          <div className="col-2">
            <label className="form-label fw-bold">Apellido Paterno</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellido..."
              onChange={handle}
              name="apepat"
              value={body.apepat}
            />
          </div>
          <div className="col-2">
            <label className="form-label fw-bold">Apellido Materno</label>
            <input
              type="text"
              className="form-control"
              name="apemat"
              onChange={handle}
              value={body.apemat}
              placeholder="Apellido..."
            />
          </div>
          <div className="col-3">
            <label className="form-label fw-bold">Carrera</label>
            <InputSelectCarrerasOrCreate
              name="carrera"
              placeholder="Carrera..."
              value={body}
              handle={handle}
            />
          </div>
          <div className="col-1 d-flex align-items-end">
            {body.matriculaV ? (
              <>
                <button className="btn btn-edit">Editar</button>
                <button
                  className="btn btn-silver ms-1"
                  type="button"
                  onClick={() =>
                    setBody({
                      matriculaV: "",
                      nombre: "",
                      matricula: "",
                      apepat: "",
                      apemat: "",
                      carrera: "",
                    })
                  }
                >
                  <i className="fa-solid fa-x" />
                </button>
              </>
            ) : (
              <button className="btn btn-primary">Guardar</button>
            )}
          </div>
        </div>
      </form>
      <div>
        {isPending && <span>Cargando carreras...</span>}
        {!isPending && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nombres</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th> Carrera</th>
                <th className="text-center">Editar</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {res.map((el) => (
                <tr key={el["matricula"]}>
                  <td>{el["matricula"]}</td>
                  <td>{el["nombre"]}</td>
                  <td>{el["apepat"]}</td>
                  <td>{el["apemat"]}</td>
                  <td>{el["Carrera"]["carrera"]}</td>
                  <td className="text-center justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        setBody(
                          Object.assign(
                            el,
                            { matriculaV: el["matricula"] },
                            {
                              carrera: {
                                id: el["Carrera"]["id"],
                                value: el["Carrera"]["id"],
                                label: el["Carrera"]["carrera"],
                                carrera: el["Carrera"]["carrera"],
                              },
                            }
                          )
                        )
                      }
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </td>

                  <td className="text-center justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        setConfimDel({ show: true, id: el["matricula"] })
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Correct show={statusReq.sucess} onHide={initStatus}></Correct>
      <Error show={statusReq.error} onHide={initStatus}></Error>
      <ModalConfirmDelElement
        show={confirmDel.show}
        onHide={() => setConfimDel({ show: false, id: "" })}
        eliminarF={eliminarAlumno}
        id={confirmDel.id}
      />
    </div>
  );
};
