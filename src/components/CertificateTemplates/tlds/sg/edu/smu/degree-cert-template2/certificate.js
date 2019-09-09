import PropTypes from "prop-types";
import { get } from "lodash";
import { CERT2_BKG_IMG } from "../common/images";
import "../common/style.scss";
import "../common/print.scss";

const Template = ({ certificate }) => {
  // Declaring what variables will be available to the template from the certificate
  const certificateName = get(certificate, "name");
  const recipientName = get(certificate, "recipient.name");
  const SerialNumber = get(certificate, "additionalData.serialNumber");
  const signature1 = get(certificate, "additionalData.signatures.signature1");
  const signature2 = get(certificate, "additionalData.signatures.signature2");
  const signature3 = get(certificate, "additionalData.signatures.signature3");
  const signature4 = get(certificate, "additionalData.signatures.signature4");
  const seal = get(certificate, "additionalData.seal");

  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div
          style={{
            border: "1px solig black",
            height: "909px",
            width: "1199px",
            backgroundImage: `url('${CERT2_BKG_IMG}')`,
            backgroundPosition: "center center",
            position: "relative"
          }}
        >
          <div
            className="col-md-12 text-center"
            style={{ fontFamily: "sarif" }}
          >
            <div
              className="row"
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "295px"
              }}
            >
              <div className="col-md-12">{recipientName}</div>
            </div>
            <div
              className="row"
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "80px",
                color: "#9c9062"
              }}
            >
              <div className="col-md-12">{certificateName}</div>
            </div>
            <div
              className="row"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: "80px"
              }}
            >
              <div style={{width: "40%", textAlign: "right", paddingRight: "25px" }}><img src={signature1} /><br/><img src={signature2} /></div>
              <div style={{ width: "20%" }}><img src={seal} /></div>
              <div style={{width: "40%", textAlign: "left", paddingLeft: "25px" }}><img src={signature3} /><br/><img src={signature4} /></div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              padding: "0 25px 5px",
              right: "0",
              bottom: "0",
              fontSize: "8px"
            }}
          >
            {SerialNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
