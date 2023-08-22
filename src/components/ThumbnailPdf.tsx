import { Viewer, Worker } from "@react-pdf-viewer/core";
import type { Plugin, RenderViewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { urlServer } from "../utils/axios";

// Import styles
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

interface PropsComponent {
  urlPdf: string;
}

export interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps;

      slot.children = PageThumbnail;

      // Reset the sub slot
      slot.subSlot!.attrs = {};
      slot.subSlot!.children = <></>;

      return slot;
    },
  };
};

const ThumbnailPdf = ({ urlPdf }: PropsComponent) => {
  const thumbnailPluginInstance = thumbnailPlugin({
    renderSpinner: () => (
      <div className="spinner-border w-50px h-50px text-primary">
        <span className="sr-only">Cargando</span>
      </div>
    ),
  });
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} width={250} />,
  });
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={urlServer.concat(urlPdf)}
        plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
      />
    </Worker>
  );
};

export default ThumbnailPdf;
