import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_PDP_SDFT_2020.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PDP-SDFT 2020 certificate is rendered correctly", async t => {
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
    .eql([
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name PDP SDFT 2020",
    "Specialist Diploma",
    "Fintech",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "PECO",
    "Temasek Polytechnic",
    "May 2020",
    "SDFT20M3002"
  ]);

  // Navigate to Transcript tab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "SUCCESSFULLY COMPLETED",
    "0003002",
    "Student Name PDP SDFT 2020",
    "S1234567A",
    "FEBRUARY 2019",
    "SPECIALIST DIPLOMA IN FINTECH",
    "CERTIFICATE IN FINTECH ANALYTICS",
    "FINTECH & FINANCIAL SERVICES",
    "CERTIFICATE IN FINTECH APPS DEVELOPMENT",
    "OPEN BANKING APIS DEVELOPMENT",
    "Graduating GPA: 2.8276",
    "The student has completed the course in SPECIALIST DIPLOMA IN FINTECH",
    "CET ACADEMY"
  ]);
});
