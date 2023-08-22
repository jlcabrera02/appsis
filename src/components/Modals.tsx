import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function Correct(props: any) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Correcto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Se guardaron los datos correctamente</p>
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
        <Modal.Title id="contained-modal-title-vcenter">Correcto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Se guardaron los datos correctamente</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="success">
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
