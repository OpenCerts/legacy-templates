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

test("NUS-UBASJDP-2019 certificate is rendered correctly", async t => {
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
    "A0119893N, NAME",
    "Master",
    "Science",
    "30 September 2015"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0119893N, name",
    "A0119893N",
    "01/01/1905",
    "11/09/2019",
    "MASTER OF SCIENCE",
    "COMPLETED PROGRAMME",
    "DOCTOR OF PHILOSOPHY",
    "ACTIVE IN PROGRAMME",
    "2014/2015 SEMESTER 1",
    "MDG5211",
    "ANTI-INFECTIVE DRUG DISCOVERY",
    "2018/2019 SEMESTER 1",
    "MDG5108",
    "BIOSTATISTICS FOR BASIC RESEARCH",
    "MDG5771",
    "Graduate Research Seminar and Workshop"
  ]);
});
