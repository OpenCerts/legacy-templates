import PropTypes from "prop-types";
import {
  renderLogoRP,
  renderAwardTextCET,
  renderTwoSignatures,
  renderFooter
} from "../common/certificate";

const Template = ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 0, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {renderLogoRP()}
      {renderAwardTextCET(certificate, 0)}
      {renderTwoSignatures(certificate, 0)}
    </div>
    {renderFooter(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
