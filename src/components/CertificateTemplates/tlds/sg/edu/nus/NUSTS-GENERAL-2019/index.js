import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { storeAddresses } from "../common";
import Transcript from "./transcript";

const templates = [
  {
    id: "transcript",
    label: "Transcript",
    template: Transcript
  }
];

const Cert = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={storeAddresses}
    {...props}
  />
);

Cert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Cert;
