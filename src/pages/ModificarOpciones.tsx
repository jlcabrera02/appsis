import axios from "../utils/axios";
import { useState } from "react";
import useGetData from "../hooks/useGetData";
import { Correct, Error, ModalConfirmDelElement } from "../components/Modals";
import { Link } from "react-router-dom";

export const ModificarOpciones = () => {
  const [statusReq, setStatusReq] = useState({ sucess: false, error: false });
  const [actualizador, setActualizador] = useState(false);
  const [confirmDel, setConfimDel] = useState({ show: false, id: "" });
  const [body, setBody] = useState({ opcion: "", id: null });
  const { data, isPending } = useGetData({
    baseUrl: "/opciones/obtener",
    actualizador,
  });
  const initStatus = () => setStatusReq({ sucess: false, error: false });
  const okStatus = () => setStatusReq({ sucess: true, error: false });
  const falseStatus = () => setStatusReq({ sucess: false, error: true });

  const guardar = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/opciones/crear", body);
      setActualizador(!actualizador);
      setBody({ opcion: "", id: null });
      okStatus();
    } catch (err) {
      falseStatus();
      console.log(err);
    }
  };

  const editar = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`/opciones/editar/${body.id}`, body);
      setActualizador(!actualizador);
      setBody({ opcion: "", id: null });
      okStatus();
    } catch (err) {
      falseStatus();
      console.log(err);
    }
  };

  const eliminarC = async (id: any) => {
    try {
      await axios.delete(`/opciones/eliminar/${id}`);
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

  return (
    <div className="container">
      <Link to="../crear-tesis" className="btn btn-primary my-3">
        <i className="fa-solid fa-arrow-left" /> Regresar
      </Link>
      <form
        onSubmit={body.id ? editar : guardar}
        className="mb-3 d-flex justify-content-between align-items-end gap-2"
      >
        <div className="flex-grow-1">
          <label className="form-label">Descripción de la opción</label>
          <input
            className="form-control"
            onChange={handle}
            type="text"
            name="opcion"
            value={body.opcion}
            placeholder="Escribe la opcion"
            required
          />
        </div>
        <div>
          {body.id ? (
            <>
              <button className="btn btn-edit">Editar</button>
              <button
                className="btn btn-silver ms-2"
                onClick={() => setBody({ opcion: "", id: null })}
              >
                <i className="fa-solid fa-x" />
              </button>
            </>
          ) : (
            <button className="btn btn-primary">Guardar Opción</button>
          )}
        </div>
      </form>
      <div>
        {isPending && <span>Cargando opciones...</span>}
        {!isPending && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Opcion</th>
                <th className="text-center">Editar</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {res.map((el) => (
                <tr key={el["id"]}>
                  <td>{el["id"]}</td>
                  <td>{el["opcion"]}</td>
                  <td className="text-center justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => setBody(el)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </td>

                  <td className="text-center justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setConfimDel({ show: true, id: el["id"] })}
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
        eliminarF={eliminarC}
        id={confirmDel.id}
      />
    </div>
  );
};
