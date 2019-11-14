import templates from "./CertificateTemplates";
import React from "react";
import { FramedDocumentRenderer } from "@govtechsg/decentralized-renderer-react-components";
console.log(templates);

export default () => <FramedDocumentRenderer templateRegistry={templates} />;
