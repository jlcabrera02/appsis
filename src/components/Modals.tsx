import axios from "../utils/axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export function Correct(props: any) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Correcto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.msg || "Se guardaron los datos correctamente"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="success">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function Error(props: any) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.msg || "Error al hacer la petición"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalViewPdf(props: any) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="primary">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalEditTesisPDF(props: any) {
  const [statusM, setStatusM] = props.modalstatus;
  const actualizarPDF = async (e: any) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("tesis", e.target.tesis.files[0]);

      await axios.put(`/tesis/editarPDF/${props["idtesis"]}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatusM({ ...statusM, ok: true });
      props.actualizador();
    } catch (err) {
      setStatusM({ ...statusM, false: true });
    }
    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Actualiza el documento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={actualizarPDF} className="d-flex gap-2">
            <div>
              <label className="form-label fw-semibold">
                Subir el documento pdf
              </label>
              <input
                type="file"
                name="tesis"
                className="form-control"
                accept="pdf"
                placeholder="Documento PDF"
              />
            </div>
            <div className="d-flex align-items-end">
              <button className="btn btn-edit">Actualizar</button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalEditAvatar(props: any) {
  const [statusM, setStatusM] = props.modalstatus;
  const actualizarPerfil = async (e: any) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("perfil", e.target.perfil.files[0]);

      await axios.put(
        `/alumnos/cambiarPerfilXmatricula/${props["matricula"]}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStatusM({ ...statusM, ok: true });
      props.actualizador();
    } catch (err) {
      setStatusM({ ...statusM, false: true });
    }
    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Actualiza el perfil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={actualizarPerfil} className="d-flex gap-2">
            <div>
              <label className="form-label fw-semibold">Subir perfil</label>
              <input
                type="file"
                name="perfil"
                className="form-control"
                accept="image/*"
                placeholder="Imagen de perfil"
              />
            </div>
            <div className="d-flex align-items-end">
              <button className="btn btn-edit">guardar</button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalConfirmDelTesis(props: any) {
  const [statusM, setStatusM] = props.modalstatus;
  const navigate = useNavigate();
  const eliminar = async (e: any) => {
    e.preventDefault();
    try {
      await axios.delete(`/tesis/eliminar/${props.idtesis}`);
      setStatusM({ ...statusM, ok: true });
      navigate("/tesis");
    } catch (err) {
      setStatusM({ ...statusM, false: true });
    }
    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Eliminar tesis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="fw-semibold">¿Estas seguro de continuar?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={eliminar} variant="danger">
          Si, estoy seguro
        </Button>
        <Button onClick={props.onHide} variant="secondary">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalConfirmDelElement(props: any) {
  console.log(props);

  const eliminar = () => props.eliminarF(props.id);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confimación para eliminar el elemento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            Si eliminar este elemento puede que las tesis que contengan este
            elemento tambien se eliminen
          </p>
          <p className="fw-semibold">¿Estas seguro de continuar?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={eliminar} variant="danger">
          Si, estoy seguro
        </Button>
        <Button onClick={props.onHide} variant="secondary">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
