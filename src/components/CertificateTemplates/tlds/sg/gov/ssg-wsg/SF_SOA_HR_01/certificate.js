import {
  renderLogoWSQ,
  renderIssuingDate,
  renderSignatureSOAHR,
  renderlistitemsAwardTextSOAHR
} from "../common/functions";
import fonts from "../common/fonts";
import certificate from "../SOA-001/certificate";

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", width:"100%", paddingRight:"6%", paddingBottom:"100px", paddingTop:"100px", paddingLeft:"6%", fontFamily:"Arial" }}
    >
      {fonts()}      
      {renderLogoWSQ(certificate)}
      {renderlistitemsAwardTextSOAHR(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignatureSOAHR(certificate)
        : ""}
    </div>
  </div>
);


