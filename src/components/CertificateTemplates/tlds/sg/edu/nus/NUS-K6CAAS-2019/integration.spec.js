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

test("NUS-K6CAAS-2019 certificate is rendered correctly", async t => {
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
    "A0006190U, NAME",
    "Graduate",
    "Diploma",
    "Aviation",
    "Management",
    "26 November 2008"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0006190U, name",
    "A0006190U",
    "01/01/1905",
    "11/09/2019",
    "GRADUATE DIPLOMA IN AVIATION MANAGEMENT",
    "COMPLETED PROGRAMME",
    "2007/2008 SPECIAL TERM (PART1)",
    "AM5011",
    "AIRPORT ADMINISTRATION, FINANCE & LAW",
    "AM5012",
    "AIRPORT OPERATIONS",
    "AM5013",
    "AIRPORT PLANNING, DESIGN & ENGINEERING",
    "AM5021",
    "TRANSPORTATION ECONOMICS",
    "AM5022",
    "TRANSPORTATION & DEVELOPMENT",
    "AM5023",
    "MANAGEMENT IN TRANSPORTATION"
  ]);
});
