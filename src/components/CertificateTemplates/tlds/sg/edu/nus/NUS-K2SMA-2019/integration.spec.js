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

test("NUS-K2SMA-2019 certificate is rendered correctly", async t => {
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
    "A0027642J, NAME",
    "Master",
    "Science",
    "(Advanced",
    "Materials",
    "for",
    "Micro-",
    "Nano-",
    "Systems)",
    "28 February 2011"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0027642J, name",
    "A0027642J",
    "01/01/1905",
    "11/09/2019",
    "MASTER OF SCIENCE (ADVANCED MATERIALS FOR MICRO- AND NANO- SYSTEMS)",
    "COMPLETED PROGRAMME",
    "2009/2010 SMA SEMESTER 1",
    "AMN5120",
    "FUNDAMENTALS OF SEMICONDUCTOR DEVICE PHYSICS",
    "2009/2010 SMA SEMESTER 2",
    "2009/2010 SMA SEMESTER 3",
    "AMN5121",
    "YIELD, RELIABILITY & FAILURE ANALYSIS OF MICROSYSTEMS",
    "AMN5122",
    "COMPOUND SEMICONDUCTORS AND DEVICES",
    "2010/2011 SMA SEMESTER 1",
    "AMN5122",
    "COMPOUND SEMICONDUCTORS AND DEVICES",
    "2010/2011 SMA SEMESTER 2",
    "EE5517",
    "Optical Engineering",
    "IE5203",
    "Decision Analysis",
    "SMA5199",
    "Internship Project"
  ]);
});
