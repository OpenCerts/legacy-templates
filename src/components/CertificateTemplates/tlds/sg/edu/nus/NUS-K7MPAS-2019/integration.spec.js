import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("National University of Singapore").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NUS-K7MPAS-2019 certificate is rendered correctly", async t => {
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
      { id: "degree", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL",
    "UNIVERSITY",
    "OF SINGAPORE",
    "A0005366L, NAME",
    "Graduate",
    "Diploma",
    "Maritime",
    "Port",
    "Management",
    "08 September 2006"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0005366L, name",
    "A0005366L",
    "01/01/1905",
    "11/09/2019",
    "GRADUATE DIPLOMA IN MARITIME AND PORT MANAGEMENT",
    "COMPLETED PROGRAMME",
    "2005/2006 SPECIAL TERM (PART1)",
    "MPA5017",
    "MARITIME MANAGEMENT & LAW",
    "MPA5018",
    "PORT TERMINAL MANAGEMENT",
    "MPA5019",
    "PORT PLANNING AND MARINE OPERATIONS MANAGAMENT",
    "MPA5027",
    "SHIPPING, PORTS AND DEVELOPMENT",
    "MPA5028",
    "PORT MANAGEMENT AND OPERATIONS",
    "MPA5029",
    "PORT ECONOMICS"
  ]);
});
