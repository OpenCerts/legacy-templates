import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  }
];

const NPCET2019NONACAD = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    {...props}
  />
);

NPCET2019NONACAD.displayName = "NP-CET2019-NONACAD Template";

export default NPCET2019NONACAD;
