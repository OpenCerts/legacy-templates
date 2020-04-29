import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "../common/certificateBody";
import CertificateFooter from "../common/certificateFooter";
import CertificateSupporter from "../common/certificateSupporter";
import { IMG_LOGO_STLUKES } from "../common/images";

const Certificate = ({ certificate }) => {
  const supporter = {
    logo: IMG_LOGO_STLUKES,
    logoStyle: "stlukes-logo",
    logoTitle: "St Lukes Academy",
    paragraph: "This programme is jointly offered by"
  };

  return (
    <div className="container">
      <style>
        {`
          .stlukes-logo {
            width: 98%;
            margin-top: 0em;
          }
        `}
      </style>
      <CertificateHeader />
      <CertificateBody certificate={certificate} />
      <CertificateFooter />
      <CertificateSupporter supporter={supporter} />
    </div>
  );
};

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
