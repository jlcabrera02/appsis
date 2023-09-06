// import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { BtnModalPdfView } from "../components/ModalPdfView";
import ThumbnailPdf from "../components/ThumbnailPdf";
import axios, { urlServer } from "../utils/axios";
import { formatFechaComplete } from "../utils/formats";
import { useState } from "react";
import { CrearTesis } from "./CrearTesis";
import {
  ModalEditTesisPDF,
  Error,
  Correct,
  ModalEditAvatar,
  ModalConfirmDelTesis,
} from "../components/Modals";
import { token } from "../utils/axios";

const Tesis = () => {
  const [dataEdit, setDataEdit] = useState("");
  const [modalStatus, setModalStatus] = useState({ ok: false, err: false });
  const [modalEditPDF, setModalEditPDF] = useState(false);
  const [modalConfirmDel, setModalConfirmDel] = useState(false);
  const [modalEditPerfil, setModalEditPerfil] = useState({
    show: false,
    matricula: "",
  });
  const [actualizador, setActualizador] = useState(false);
  const { idtesis } = useParams();
  const { data, isPending }: any = useGetData({
    baseUrl: `/tesis/obtener/${idtesis}`,
    actualizador,
  });
  const res = data ? data.response : {};

  const actualizadorF = () => setActualizador(!actualizador);

  const btnEdit = () => {
    const dataedit = {
      ...res,
      carrera: {
        ...res.Carrera,
        label: res.Carrera.carrera,
        value: res.Carrera.id,
      },
      categoria: {
        ...res.Categoria,
        label: res.Categoria.categoria,
        value: res.Categoria.id,
      },
      opcion: {
        ...res.Opcione,
        label: res.Opcione.opcion,
        value: res.Opcione.id,
      },
      estado: {
        label: res.estado,
        estado: res.estado,
        value: res.estado,
      },
      municipio: {
        label: res.municipio,
        municipio: res.municipio,
        value: res.municipio,
      },
    };
    setDataEdit(dataedit);
  };

  const downloadFile = async (file: any) => {
    try {
      const fileServer = await axios.get(urlServer.concat(file.tesis), {
        headers: { "Content-Type": "application/pdf" },
        responseType: "blob",
      });

      const URLOject = URL.createObjectURL(fileServer.data);

      const a = document.createElement("a");
      a.href = URLOject;
      a.rel = "noopener noreferrer";
      a.download = `${file.titulo}.pdf`;

      a.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mb-3">
      {token && (
        <div className="d-flex justify-content-center mb-2">
          <div className="d-flex gap-2 justify-content-end flex-grow-1">
            {!dataEdit ? (
              <button className="btn btn-edit" onClick={btnEdit}>
                <i className="fa-solid fa-pencil" /> Editar tesis
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setDataEdit("")}
              >
                Cancelar edición
              </button>
            )}
            <button
              className="btn btn-delete "
              onClick={() => setModalConfirmDel(true)}
            >
              <i className="fa-solid fa-trash" /> Eliminar tesis
            </button>
          </div>
        </div>
      )}
      {!dataEdit && data && (
        <>
          <div className="row mb-3">
            <div className="col-sm-lg-8 col-lg-8 d-flex">
              <div className="m-auto">
                <div className="">
                  <span className="fw-bold fs-5  text-primary">Titulo: </span>
                  <span className="fw-bold "> {res.titulo}</span>
                </div>
                <div className="text-start">
                  <span className="fw-bold">Resumen: </span>
                  <span className="">
                    <em> {res.resumen}</em>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div
                className="m-auto border border-primary  mb-2"
                style={{ maxWidth: "max-content" }}
              >
                <ThumbnailPdf urlPdf={res.tesis} />
              </div>

              <div className="d-flex justify-content-evenly">
                <BtnModalPdfView urlPdf={res.tesis} title={res.titulo} />
                {token && (
                  <button
                    className="btn btn-edit"
                    onClick={() => setModalEditPDF(true)}
                  >
                    <i className="fa-solid fa-pencil" /> editar
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => downloadFile(res)}
                >
                  Descargar
                </button>
              </div>
            </div>
            <div></div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4 className="fw-semibold">Autor(es)</h4>
            </div>
            {data &&
              !isPending &&
              res.autores.map((autor: any) => (
                <FigurePerfilAutores
                  matricula={autor["matricula"]}
                  key={autor["matricula"]}
                  setModalEdit={setModalEditPerfil}
                />
              ))}
          </div>
          <div className="row">
            <div className="col-sm-12 col-12 d-flex">
              <table className="table table-secondary m-auto">
                <tbody>
                  <tr>
                    <th className="fw-bold text-primary">Adquisición</th>
                    <th>
                      <span className="fw-semibold">{res.adquisicion}</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Ficha</th>
                    <th>
                      <span className="fw-semibold">{res.ficha}</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Matricula(s)</th>
                    <th>
                      <span className="fw-semibold">
                        {res.autores
                          .map((autor: any) => autor.matricula)
                          .join(", ")}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Autor(es)</th>
                    <th>
                      <span className="fw-semibold">
                        {res.autores
                          .map((autor: any) => autor.nombre)
                          .join(", ")}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Categoria</th>
                    <th>
                      <span className="fw-semibold text-center">
                        {res.Categoria.categoria}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Carrera</th>
                    <th>
                      <span className="fw-semibold text-center">
                        {res.Carrera.carrera}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Institución</th>
                    <th>
                      <span className="fw-semibold">{res.institucion}</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="fw-bold text-primary">Lugar</th>
                    <th>
                      <span className="fw-semibold">
                        {res.municipio}, {res.estado}
                      </span>
                    </th>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-primary">Fecha publicación</td>
                    <td className="">{formatFechaComplete(res.createdAt)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
      {dataEdit && (
        <CrearTesis
          data={dataEdit}
          setDataEdit={setDataEdit}
          actualizador={actualizadorF}
        />
      )}
      <ModalEditTesisPDF
        idtesis={res["id"]}
        show={modalEditPDF}
        modalstatus={[modalStatus, setModalStatus]}
        onHide={() => setModalEditPDF(false)}
        actualizador={actualizadorF}
      />
      <Error
        show={modalStatus.err}
        onHide={() => setModalStatus({ ok: false, err: false })}
      />
      <Correct
        show={modalStatus.ok}
        onHide={() => setModalStatus({ ok: false, err: false })}
      />
      <ModalEditAvatar
        matricula={modalEditPerfil.matricula}
        show={modalEditPerfil.show}
        modalstatus={[modalStatus, setModalStatus]}
        onHide={() => setModalEditPerfil({ show: false, matricula: "" })}
        actualizador={actualizadorF}
      />
      <ModalConfirmDelTesis
        idtesis={data && !isPending && res.id}
        show={modalConfirmDel}
        modalstatus={[modalStatus, setModalStatus]}
        onHide={() => setModalConfirmDel(false)}
        actualizador={actualizadorF}
      />
    </div>
  );
};

const FigurePerfilAutores = ({ matricula, setModalEdit }: any) => {
  const avatar = useGetData({
    baseUrl: `/alumnos/obtener?matricula=${matricula}`,
  });

  const resAva = avatar.data ? avatar.data["response"] : [];

  return (
    <div className="col-sm-3 col-12 d-flex">
      <figure className="figure m-auto">
        <img
          src={urlServer.concat(resAva.length > 0 ? resAva[0]["avatar"] : "")}
          alt="Perfil"
          className="figure-img img-fluid rounded object-fit-cover img-fluid img-thumbnail border-primary w-250px h-300px rounded"
        />
        <figcaption className="figure-caption">
          {resAva.length > 0 && !avatar.isPending && (
            <p
              onClick={
                token ? () => setModalEdit({ show: true, matricula }) : () => {}
              }
              role="button"
            >
              {resAva[0]["nombre"]} {resAva[0]["apepat"]} {resAva[0]["apemat"]}{" "}
              {token && <i className="fa-solid fa-pencil text-edit" />}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default Tesis;
