import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("ROPSTEN : Skillsfuture Singapore").page`http://localhost:3000`;

const Certificate = "./SOA-MF-01.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("SOAMF01 certificate is rendered correctly", async t => {
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
    "Industry and Generic Skills SOA",
    "is awarded to",
    "A",
    "ID No: S0000000A",
    "for successfully meeting the requirements of the above programme and attainment of the competencies in the following modules of the Generic Manufacturing Skills WSQ Framework:",
    "- Develop strategies for total remuneration (HR-PRB-503E-1)",
    "at SINGAPORE NATIONAL EMPLOYERS FEDERATION",
    "01 Dec 2018"
  ]);
});
