/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree
} from "../common/degreeScrollFramework";

// check whether use old wording
const useOldWording2022 = dataSource =>
  dataSource.additionalData.programData &&
  dataSource.additionalData.programData.some(
    prog =>
      prog.programCode &&
      prog.programCode.startsWith("B09") &&
      prog.admitTerm &&
      prog.admitTerm < "1810"
  );
// check whether it is diploma
const isDiploma = degreeCode => degreeCode.startsWith("G");

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  // logo is default
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  // Use old wording for bachelor degree with admit term earlier than 1810.
  // Otherwise, use new wording (incl. master degree and grad diploma)
  dataFeeder.postNameText = !useOldWording2022(dataSource)
    ? "having fulfilled the requirements prescribed\n" +
      "by the Yong Siew Toh Conservatory of Music,\n" +
      "National University of Singapore,\n" +
      `${
        isDiploma(dataSource.additionalData.degreeScroll[0].degreeCode)
          ? "was awarded the"
          : "was conferred the degree of"
      }`
    : "having fulfilled the requirements prescribed\n" +
      "by the Yong Siew Toh Conservatory of Music, National\n" +
      "University of Singapore, in collaboration with the\n" +
      "Peabody Conservatory of Music of The Johns\n" +
      "Hopkins University, was conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = "2.5cm";
  if (dataSource.additionalData.images) {
    dataFeeder.useDefaultSignature(
      dataSource.additionalData.images.TRUSTEES,
      dataSource.additionalData.images.PRESIDENT
    );
  }
  return dataFeeder;
};

const Template = ({ certificate }) => {
  // JSON data source
  const jsonData = certificate;

  // data feeder
  const dataFeeder = getDataFeeder(jsonData);

  // 794px is width of A4 portrait (21cm)
  const ratio = (window.innerWidth - 30) / 794;
  const scale =
    ratio < 1
      ? {
          transform: `scale(${ratio}, ${ratio})`,
          transformOrigin: "top left"
        }
      : null;
  const html = (
    <div style={scale}>
      <Degree dataFeeder={dataFeeder} />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
