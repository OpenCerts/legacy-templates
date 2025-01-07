import { get } from "lodash";
import { IMG_SCDF, IMG_SEAL, IMG_SSGLOGO } from "../common";
import {
  effectiveDateForWSQLOGO,
  formatDate,
  getRecipientID,
  isNotEffectticeCertCode,
  renderCertCode,
  renderSignature as renderFooterSignature,
} from "../common/functions";
import fonts from "../common/fonts";
import { DisablePrintWatermark } from "../../../../../../../utils/PrintWatermark";
import scss from "./styles.scss";

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
const SOA_003 = ({ logo }) => ({ certificate }) => {
  return (
    <>
      {fonts()}
      <DisablePrintWatermark />
      <div className={`d-flex flex-column ${scss.page}`}>
        <div style={{ maxWidth: "320px" }}>
          {effectiveDateForWSQLOGO(certificate)}
        </div>
        <div className="my-5">{renderSOATitle(certificate)}</div>
        <div className="my-3">{renderRecipient(certificate)}</div>
        <div className="my-3 flex-grow-1">
          {renderIndustry(certificate)}
          {renderTranscripts(certificate)}
          {renderIssuingDate(certificate)}
        </div>
        {certificate.additionalData.certSignatories && (
          <div className="mt-3">{renderFooter(certificate)}</div>
        )}
      </div>
    </>
  );
};

export default SOA_003;

// From Dec 2024 as requested by SSG: The following variables/functions are decoupled away from "src/components/CertificateTemplates/tlds/sg/gov/ssg-wsg/common/functions.js"
const styles = {
  soaTitleTextStyle: {
    marginBottom: "0px",
    fontSize: "30px",
    color: "rgb(197,41,155)",
    wordBreak: "break-word",
    textAlign: "left",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  soaBlueTitleTextStyle: {
    marginBottom: "0px",
    fontSize: "30px",
    color: "rgb(51,0,144)",
    wordBreak: "break-word",
    textAlign: "left",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  awardTextStyle: {
    marginBottom: "0px",
    fontSize: "19px",
    color: "rgb(197,41,155)",
    fontWeight: "bold",
    textAlign: "left",
  },
  awardBlueTextStyle: {
    marginBottom: "0px",
    fontSize: "19px",
    color: "rgb(51,0,144)",
    fontWeight: "bold",
    textAlign: "left",
  },
  recipientNameTextStyle: {
    marginBottom: "0px",
    fontSize: "24px",
    textAlign: "left",
  },
  recipientIdTextStyle: {
    marginBottom: "0px",
    fontWeight: "400",
    color: "#000000",
  },
  transcriptTextStyle: {
    marginBottom: "0px",
    fontSize: "19px",
  },
  issuersTextStyle: {
    marginBottom: "0px",
    fontSize: "19px",
  },
  certNoStyle: {
    marginBottom: "0px",
    fontSize: "11px",
  },
  footerTextStyle: {
    fontSize: "9.5px",
    color: "rgb(51,0,144)",
  },
};

function renderRecipient(certificate) {
  return (
    <>
      {renderAwardedTo(certificate)}
      {renderRecipientName(certificate)}
      {renderRecipientID(certificate)}
    </>
  );
}

function renderSOATitle(certificate) {
  const date = certificate.attainmentDate.split("T");
  const dateSplit = date[0].split("-");
  const intDate = parseInt(dateSplit[0] + dateSplit[1] + dateSplit[2], 10);
  if (isNotEffectticeCertCode(certificate)) {
    return (
      <p style={styles.soaTitleTextStyle} className="RobotoMedium">
        STATEMENT OF ATTAINMENT
      </p>
    );
  }
  if (intDate < 20201225) {
    return (
      <p style={styles.soaTitleTextStyle} className="RobotoMedium">
        STATEMENT OF ATTAINMENT
      </p>
    );
  }
  return (
    <p style={styles.soaBlueTitleTextStyle} className="RobotoMedium">
      STATEMENT OF ATTAINMENT
    </p>
  );
}

function renderAwardedTo(certificate) {
  const date = certificate.attainmentDate.split("T");
  const dateSplit = date[0].split("-");
  const intDate = parseInt(dateSplit[0] + dateSplit[1] + dateSplit[2], 10);
  if (isNotEffectticeCertCode(certificate)) {
    return (
      <p style={styles.awardTextStyle} className="RobotoMedium">
        is awarded to
      </p>
    );
  }
  if (intDate < 20201225) {
    return (
      <p style={styles.awardTextStyle} className="RobotoMedium">
        is awarded to
      </p>
    );
  }
  return (
    <p style={styles.awardBlueTextStyle} className="RobotoMedium">
      is awarded to
    </p>
  );
}

function renderRecipientName(certificate) {
  return (
    <p style={styles.recipientNameTextStyle} className="RobotoMedium">
      {certificate.recipient.name}
    </p>
  );
}

function renderRecipientID(certificate) {
  return (
    <p style={styles.recipientIdTextStyle} className="RobotoMedium">
      ID No: {getRecipientID(certificate.recipient)}
    </p>
  );
}

function renderIndustry(certificate) {
  const date = certificate.attainmentDate.split("T");
  const dateSplit = date[0].split("-");
  const intDate = parseInt(dateSplit[0] + dateSplit[1] + dateSplit[2], 10);
  if (isNotEffectticeCertCode(certificate)) {
    return (
      <p style={styles.awardTextStyle} className="RobotoMedium">
        {get(certificate, "additionalData.certCode").includes(
          "SF_SOA_ES_001"
        ) || get(certificate, "additionalData.certCode").includes("SOA-ES-001")
          ? "for successful attainment of the required competencies in"
          : "for successful attainment of the following industry approved competencies"}
      </p>
    );
  }
  if (intDate < 20201225) {
    return (
      <p style={styles.awardTextStyle} className="RobotoMedium">
        {get(certificate, "additionalData.certCode").includes(
          "SF_SOA_ES_001"
        ) || get(certificate, "additionalData.certCode").includes("SOA-ES-001")
          ? "for successful attainment of the required competencies in"
          : "for successful attainment of the following industry approved competencies"}
      </p>
    );
  }
  return (
    <p style={styles.awardBlueTextStyle} className="RobotoMedium">
      {get(certificate, "additionalData.certCode").includes("SF_SOA_ES_001") ||
      get(certificate, "additionalData.certCode").includes("SOA-ES-001")
        ? "for successful attainment of the required competencies in"
        : "for successful attainment of the following industry approved competencies"}
    </p>
  );
}

function renderTranscripts(certificate) {
  return (
    <>
      <div className="my-4">
        {certificate.transcript.map((item) => (
          <p
            style={styles.transcriptTextStyle}
            className="RobotoMedium"
            key={item.courseCode}
          >
            {item.courseCode} {item.name}
          </p>
        ))}
      </div>
      <p style={styles.issuersTextStyle} className="my-0 RobotoRegular">
        at {certificate.additionalData.assessmentOrgName}
      </p>
    </>
  );
}

function renderIssuingDate(certificate) {
  return (
    <p style={styles.issuersTextStyle} className="mt-3 RobotoRegular">
      {formatDate(certificate.attainmentDate)}
    </p>
  );
}

const renderFooter = (certificate) => (
  <div className={scss.footer}>
    <div className={scss["footer-left"]}>{renderFooterSeal(certificate)}</div>
    <div className={scss["footer-middle-upper"]}>
      {renderFooterSignature(certificate)}
      <img style={{ width: "155px" }} src={IMG_SSGLOGO} />
    </div>
    <div className={scss["footer-middle-lower"]}>
      {renderFooterNote(certificate)}
    </div>
    <div className={scss["footer-right-upper"]}>
      {renderFooterCertNo(certificate)}
    </div>
    <div className={scss["footer-right-lower"]}>
      {renderFooterPartnership(certificate)}
    </div>
  </div>
);

const renderFooterSeal = (certificate) => (
  <>
    {["FQ-004", "SF_FQ_004"].includes(
      get(certificate, "additionalData.certCode")
    ) ? (
      <img style={{ height: "140px" }} src={IMG_SEAL} />
    ) : (
      <img style={{ height: "140px" }} src={IMG_SEAL} />
    )}
  </>
);

const renderFooterNote = (certificate) => (
  <>
    <div style={styles.footerTextStyle} className="RobotoLight">
      The training and assessment of the abovementioned learner are accredited
      in accordance with the Singapore Workforce Skills Qualifications System.
      {["FQ-004", "SF_FQ_004", "SOA-002"].includes(
        get(certificate, "additionalData.certCode")
      ) ? (
        <span>
          <br />
          and the Early Childhood Development Agency (ECDA)
        </span>
      ) : (
        ""
      )}
      {["FQ-004", "SF_FQ_004", "SOA-002"].includes(
        get(certificate, "additionalData.certCode")
      ) ? (
        <span>
          <br />
          Accreditation Standards for Early Childhood Teacher Training Courses.
        </span>
      ) : (
        ""
      )}
      {["SF_FQ_002", "SF_FQ_004"].includes(
        get(certificate, "additionalData.certCode")
      ) ? (
        <span>
          <br />
          This WSQ programme is aligned to the Skills Framework.
        </span>
      ) : (
        ""
      )}
    </div>
    <div style={styles.footerTextStyle} className="RobotoLight">
      <br />
      <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
        www.ssg.gov.sg
      </a>
      <br />
      For verification of this certificate, please visit{" "}
      <a
        style={{ color: "rgb(51,0,144)" }}
        href="https://myskillsfuture.sg/verify_eCert.html"
      >
        https://myskillsfuture.sg/verify_eCert.html
      </a>
    </div>
  </>
);

const renderFooterCertNo = (certificate) => (
  <p style={styles.certNoStyle} className="RobotoRegular">
    Cert No: {get(certificate, "additionalData.serialNum")}
  </p>
);

const renderFooterPartnership = (certificate) => (
  <>
    <div style={styles.footerTextStyle}>In partnership with</div>
    <img style={{ width: "75px" }} src={IMG_SCDF} />
    {renderCertCode(certificate)}
    {["SOA-003", "SF_SOA_003"].includes(
      get(certificate, "additionalData.certCode")
    ) ? (
      <div>
        <a href="www.scdf.gov.sg" style={styles.footerTextStyle}>
          www.scdf.gov.sg
        </a>
      </div>
    ) : (
      ""
    )}
  </>
);
