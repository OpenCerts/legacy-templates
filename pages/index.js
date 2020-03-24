import Head from "next/head";
import FramelessViewerPageContainer from "../src/components/FramelessViewer/FramelessViewerPageContainer";
import { PrintWatermark } from "../src/utils/PrintWatermark";

const FramelessViewerPage = () => (
  <div style={{ position: "relative" }}>
    <Head>
      <title>OpenCerts - Frameless Certificate Viewer</title>
    </Head>
    <PrintWatermark />
    <FramelessViewerPageContainer />
  </div>
);

export default FramelessViewerPage;
