import React from 'react';
import PropTypes from "prop-types";
import { get } from 'lodash';
import { EchelonLogo, E27Logo, ApacLogo } from "./resources";
import { QRCode } from 'react-qr-svg';

const Template = ({ certificate }) => {
  const scaleValue = window.innerWidth*0.8 / 595;
  const translateX = 72;
  const translateY = 0;
  return (
    <div
      id="test"
      style={{
        backgroundColor: "white",
        textAlign: "center",
        height: 842,
        width: 595,
        position: "relative",
        boxShadow: "0 2px 8px rgba(31,45,61,.05)",
        transform: `scale(${scaleValue}) translate(${translateX}px, ${translateY}px) `, 
        transformOrigin: '0 0 0',
        marginBottom: '10%'
      }}
    >
      <div
        style={{
          backgroundColor: "#2F166F",
          height: 232,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 64.22,
          marginBottom: 4
        }}
      >
        <EchelonLogo />
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 36,
            height: 96,
            fontWeight: 700,
            lineHeight: "48px",
            width: 514,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          {get(certificate, 'name').split('|')[0]}
        </div>
      </div>
      <div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            presented to
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            {get(certificate, 'recipient.name')}
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            by
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            e27
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            for
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            Echelon Asia Summit 2019
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 15
            }}
          >
            participating as
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 40,
              width: "100%"
            }}
          >
            {get(certificate, 'name').split('|')[1]}
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 11
            }}
          >
            Blockchain proof
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 27, width: "100%" }}>
        <E27Logo />
        <img
          src={ApacLogo}
          style={{ marginLeft: 32, width: 53, height: 49.4 }}
        />
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="H"
          style={{ width: 70, marginLeft: 283 }}
          value={get(certificate, 'additionalData.certificationLink')}
        />
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};
export default Template;
