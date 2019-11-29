import { get } from "lodash";
import {
  formatDateFullMonthProperDay,
  splitStringTo2,
  certNameDisplay
} from "./functions";
import {
  renderLogoNP,
  renderLogoNPPartner,
  renderFooter,
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle
} from "./certificate";

export const formatCertName = (certId, certName) => {
  let [certPrefix, certDescr] = ["", ""];
  let delimiter = "leading to the";
  [certPrefix, certDescr] = splitStringTo2(certName, " leading to the ");

  if (!certPrefix) {
    delimiter = "in";
    [certPrefix, certDescr] = splitStringTo2(certName, " in ");
  }

  const renderedCertName = certNameDisplay(certPrefix, certDescr, delimiter);

  return <p>{renderedCertName}</p>;
};

const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    >
      <br />
      <br />
      <p style={printTextStyle}>This is to certify that</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={nameTextStyle}>{get(certificate, "recipient.name")}</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        {get(certificate, "additionalData.certContent1")}
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        {get(certificate, "additionalData.certContent2")}
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>was awarded the</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={titleTextStyle}>
        {formatCertName(certificate.id, certificate.name)}
      </p>
      <br />
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        {get(certificate, "additionalData.certContent3")}
      </p>
      <br />
      <br />
      <br />
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        {formatDateFullMonthProperDay(certificate.issuedOn)}
      </p>
    </div>
  </div>
);

export const renderFourSignatures = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "8rem", marginBottom: "1rem" }}
    >
      <div className="col-1" />
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].organisation")}
        </div>
      </div>
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[1].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].organisation")}
        </div>
      </div>
      <div className="col-1" />
    </div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      <div className="col-1" />
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[2].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].organisation")}
        </div>
      </div>

      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[3].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[3].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[3].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[3].organisation")}
        </div>
      </div>
      <div className="col-1" />
    </div>
    <br />
  </div>
);

export const renderThreeSignatures = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "8rem", marginBottom: "1rem" }}
    >
      <div className="col-4" />
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].organisation")}
        </div>
      </div>
      <div className="col-3" />
    </div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      <div className="col-1" />
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[1].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].organisation")}
        </div>
      </div>

      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[2].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].organisation")}
        </div>
      </div>
      <div className="col-1" />
    </div>
    <br />
  </div>
);

const renderTwoSignatures = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center align-items-center"
      style={{ marginTop: "8rem", marginBottom: "2rem" }}
    >
      <div className="col-1" />
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].organisation")}
        </div>
      </div>
      <div className="col-5">
        <div className="px-5">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[1].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].organisation")}
        </div>
      </div>
      <div className="col-1" />
    </div>
    <br />
  </div>
);

const renderSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "2rem" }}
  >
    <div className="col-4" />
    <div className="col-4">
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
        <hr />
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].name")}
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
    </div>
    <div className="col-4" />
    <br />
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo, left }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {logo ? renderLogoNPPartner(logo, left) : renderLogoNP()}
      {renderAwardText(certificate)}
      {certificate.additionalData.certSignatories &&
      certificate.additionalData.certSignatories[3]
        ? renderFourSignatures(certificate) :
		(certificate.additionalData.certSignatories &&
      certificate.additionalData.certSignatories[2] ?
	  	renderThreeSignatures(certificate) :
        (certificate.additionalData.certSignatories &&
          certificate.additionalData.certSignatories[1] ?
    	  	renderTwoSignatures(certificate) :
          renderSignatures(certificate)
        )
	  )
	}
    </div>
    {renderFooter(certificate)}
  </div>
);
