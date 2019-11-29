import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_SC_MAGES_2019.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NP-CET-SC-MAGES 2019 certificate is rendered correctly", async t => {
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
    "Student Name SC MAGES Cert 2019",
    "having passed all required assessments",
    "of the 40-hour course",
    "Certificate of Performance",
    "Augmented Reality Design and Development",
    "ABC Name 1",
    "DIRECTOR, SCHOOL OF INFOCOMM TECHNOLOGY",
    "NGEE ANN POLYTECHNIC",
    "ABC Name 2",
    "CHIEF EXECUTIVE OFFICER",
    "MAGES INSTITUTE OF EXCELLENCE",
    "30 May 2019",
    "NPCETMAG0001"
  ]);
});
