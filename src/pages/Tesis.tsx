// import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { BtnModalPdfView } from "../components/ModalPdfView";
import ThumbnailPdf from "../components/ThumbnailPdf";
import axios, { urlServer } from "../utils/axios";
import { formatFechaComplete } from "../utils/formats";

const Tesis = () => {
  const { idtesis } = useParams();
  const { data }: any = useGetData({ baseUrl: `/tesis/obtener/${idtesis}` });
  const res = data ? data.response : {};

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
      {data && (
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
                className="m-auto border border-primary max-w-max mb-2"
                style={{ maxWidth: "max-content" }}
              >
                <ThumbnailPdf urlPdf={res.tesis} />
              </div>
              <div className="d-flex justify-content-evenly">
                <BtnModalPdfView urlPdf={res.tesis} title={res.titulo} />
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
            <div className="col-sm-3 col-4 my-2">
              <img
                src={urlServer.concat(res.Alumno.avatar)}
                alt="Perfil"
                className="w-100 m-auto d-block object-fit-cover img-fluid img-thumbnail border-primary rounded"
              />
            </div>
            <div className="col-sm-9 col-12 d-flex">
              <table className="table table-secondary m-auto">
                <tbody>
                  <tr>
                    <th className="fw-bold text-primary">Autor</th>
                    <th>
                      <span className="fw-semibold">
                        {res.Alumno.nombre} {res.Alumno.apepat}{" "}
                        {res.Alumno.apemat}
                      </span>
                    </th>
                  </tr>
                  {res.coautor && (
                    <tr>
                      <th className="fw-bold text-primary">Coautor</th>
                      <th>
                        <span className="fw-semibold">
                          {res.Alumno_coautor.nombre}{" "}
                          {res.Alumno_coautor.apepat}{" "}
                          {res.Alumno_coautor.apemat}
                        </span>
                      </th>
                    </tr>
                  )}
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
    </div>
  );
};

export default Tesis;
