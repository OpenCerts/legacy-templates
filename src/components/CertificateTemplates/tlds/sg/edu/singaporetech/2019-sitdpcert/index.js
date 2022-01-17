import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import SITAddress from "../common/address";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const SITCert = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={SITAddress}
    {...props}
  />
);

export default SITCert;
