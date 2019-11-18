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

const NP2019NONACAD = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    {...props}
  />
);

NP2019NONACAD.displayName = "NP-2019-NONACAD Template";

export default NP2019NONACAD;
