import { Viewer, Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { urlServer } from "../utils/axios";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ViewPdf = (props: any) => {
  const zoomPluginIntance = zoomPlugin();
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: () => {
      return props.title;
    },
  });
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginIntance;
  const { DownloadButton } = getFilePluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="w-100 h-100">
        <div className="d-flex justify-content-center">
          <ZoomOutButton />
          <ZoomPopover />
          <ZoomInButton />
          <DownloadButton />
        </div>
        <Viewer
          fileUrl={urlServer.concat(props.urlPdf)}
          plugins={[zoomPluginIntance, getFilePluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default ViewPdf;
