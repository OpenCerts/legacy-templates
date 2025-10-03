import Head from "next/head";
import FramelessViewerPageContainer from "../src/components/FramelessViewer/FramelessViewerPageContainer";
import { WatermarkProvider } from "../src/utils/PrintWatermark";

const FramelessViewerPage = () => (
  <div style={{ position: "relative" }}>
    <Head>
      <title>OpenCerts - Frameless Certificate Viewer</title>
    </Head>
    <WatermarkProvider>
      <FramelessViewerPageContainer />
    </WatermarkProvider>
  </div>
);

export default FramelessViewerPage;
