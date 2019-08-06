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

test("NUS-K1-2019 degree scroll is rendered correctly", async t => {
  // Inject javascript and execute window.opencerts.renderDocument
  const certificateContent = getData(
    JSON.parse(readFileSync(join(__dirname, Certificate)).toString())
  );
  await t.eval(() => window.opencerts.renderDocument(certificateContent), {
    dependencies: { certificateContent }
  });

  // Check content of window.opencerts.templates
  await t.wait(500);
  const templates = await t.eval(() => window.opencerts.getTemplates());
  await t
    .expect(templates)
    .eql([
      { id: "degree", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined },
    ]);

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL UNIVERSITY",
    "OF SINGAPORE",
    "BACHELOR OF ENGINEERING",
    "PASS",
    "MECHANICAL ENGINEERING (HONS)",
    "30 June 2013",
    "Chair, Board of Trustees",
    "President"
  ]);

  // Transcript tab content
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "STUDENT NO:",
    "A0056627Y",
    "BACHELOR OF ENGINEERING (MECHANICAL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "ACADEMIC YEAR 2009/2010 SEMESTER 1",
    "CUMULATIVE AVERAGE POINT :",
    "CONFERRED/AWARDED THE DEGREE(S)/DIPLOMA(S) OF:",
    "CONFERMENT DATE:"
  ]);
});
