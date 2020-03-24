import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Singapore Institute Of Technology").page`http://localhost:3000`;

const Certificate = "./XXXXXXX_BJ001_DP.opencert";

// Only Certficate, No Transcript
// const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("2019-sitdpcert certificate is rendered correctly", async t => {
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

  // Certificate content
  await validateTextContent(t, RenderedCertificate, [
    "DP STUDENT NAME",
    "DigiPen Institute of Technology Singapore was conferred the joint degree of",
    "BACHELOR OF ENGINEERING",
    "in Systems Engineering (ElectroMechanical Systems)",
    "on 30th May 2019."
  ]);
});
