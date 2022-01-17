import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_SCDF_2019.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NP-CET-SCDF 2019 certificate is rendered correctly", async t => {
  // Inject javascript and execute window.opencerts.renderDocument
  const certificateContent = getData(
    JSON.parse(readFileSync(join(__dirname, Certificate)).toString())
  );
  await t.eval(() => window.opencerts.renderDocument(certificateContent), {
    dependencies: { certificateContent }
  });

  // Check content of window.opencerts.templates
  const container = Selector("#rendered-certificate .container");
  await container(); // wait for document to be rendered
  const templates = await t.eval(() => window.opencerts.getTemplates());
  await t
    .expect(templates)
    .eql([{ id: "certificate", label: "Certificate", template: undefined }]);

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name SCDF Cert 2019",
    "having successfully completed the Specialist Diploma in Sustainable Facilities Management and passed all required assessments for",
    "Fire Safety Manager’s course",
    "Fire Safety Manager Accredited Training Institution",
    "18 April 2019 to 12 June 2019",
    "CIVIL DEFENCE ACADEMY",
    "DIRECTOR, SCHOOL OF DESIGN & ENVIRONMENT",
    "NGEE ANN POLYTECHNIC",
    "30 May 2019",
    "NPDEFB19001"
  ]);
});
