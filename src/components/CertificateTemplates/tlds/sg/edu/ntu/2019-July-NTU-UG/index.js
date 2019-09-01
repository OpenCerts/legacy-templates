import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import { approvedAddresses } from "../common";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const NTU2019UG = props => (
  <MultiCertificateRenderer
    templates={templates}
    approvedAddresses={approvedAddresses}
    {...props}
  />
);

export default NTU2019UG;
