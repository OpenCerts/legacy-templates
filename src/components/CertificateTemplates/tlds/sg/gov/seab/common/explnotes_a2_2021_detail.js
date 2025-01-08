import PropTypes from "prop-types";

import {
  EXPLANATORY_CONTENT,
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_FONT_SIZE_13_LEFT
} from "./style";

import { COMMAN_EXPL_8, COMMAN_EXPL_7 } from "./explnotes";

export const RENDEREXPLANATORYNOTES_A2_2021 = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          1
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The Singapore Examinations and Assessment Board is authorised by the
          Republic of Singapore to manage national examinations in Singapore.
          The Board, together with the Ministry of Education (MOE), Singapore
          and the Cambridge Assessment International Education are joint
          examining authorities for the General Certificate of Education
          Advanced Level [GCE A-Level] Examination.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          2
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The pass grades for GCE A-Level subjects are shown by the alphabetical
          grades A, B, C, D, E (Grade A is the highest and Grade E the lowest).
          Grade O indicates that a candidate has failed to obtain a pass at GCE
          A-Level but is judged to have reached Grade 6 at GCE Ordinary Level
          (GCE O-Level). Grade F is a fail grade.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          3
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Candidates who sit GCE A-Level subjects with Special Papers will have
          their Special Papers results shown by numerical grade 1 (Distinction),
          2 (Merit), U (Unclassified).
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          4
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          {COMMAN_EXPL_8()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          5
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Performance in the Oral/Aural Examinations in Chinese Language and the
          Oral Examinations in Malay and Tamil Languages is indicated as
          Distinction (DIST), Merit, Pass or Ungraded.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          6
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          All JC1/PU2 school candidates from 2003 are required to offer Project
          Work (PW). The level of achievement in PW is indicated by bands from
          Band 1 to 4 (Band 1 is the highest and Band 4 the lowest).
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          7
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Performance in the Mother Tongue B subjects (Chinese B / Malay B /
          Tamil B) is indicated as Merit, Pass or Ungraded. Mother Tongue B is
          not an A-Level or AO-Level subject.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          8
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Where a subject is not developed by MOE / Cambridge Assessment
          International Education, the examining authority for the subject is
          printed in brackets below the subject title.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13_LEFT}>
          9
        </div>
        {COMMAN_EXPL_7()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          10
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          This document is issued on condition of your strict compliance with
          the Examination Instructions and Regulations. You must comply with any
          direction by the Singapore Examinations and Assessment Board (SEAB) to
          return this document to SEAB.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          11
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          For further information or clarification on the GCE A-Level, please
          visit the website of the Singapore Examinations and Assessment Board
          (https://www.seab.gov.sg).
        </div>
      </div>
    </div>
  </div>
);

RENDEREXPLANATORYNOTES_A2_2021.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default () => RENDEREXPLANATORYNOTES_A2_2021;
