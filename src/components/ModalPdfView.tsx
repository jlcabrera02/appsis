import { useState } from "react";
import ViewPdf from "./ViewPdf";
import { ModalViewPdf } from "./Modals";

export const BtnModalPdfView = (props: any) => {
  const [shown, setShown] = useState(false);
  return (
    <>
      <button onClick={() => setShown(true)} className="btn btn-primary">
        Visualizar
      </button>
      <ModalViewPdf
        onHide={() => setShown(false)}
        show={shown}
        title={props.title}
      >
        <ViewPdf urlPdf={props.urlPdf} title={props.title} />
      </ModalViewPdf>
    </>
  );
};

export default BtnModalPdfView;
