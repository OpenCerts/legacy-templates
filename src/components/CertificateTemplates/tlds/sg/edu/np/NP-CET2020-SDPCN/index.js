import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";
import NPTranscript from "./transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: NPTranscript
  }
];

const NPCET2020SDPCN = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    {...props}
  />
);

NPCET2020SDPCN.displayName = "NP-CET2020-SDPCN Template";

export default NPCET2020SDPCN;
