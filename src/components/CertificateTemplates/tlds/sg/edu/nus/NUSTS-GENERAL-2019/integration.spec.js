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

test("NUSTS-GENERAL-2019 certificate is rendered correctly", async t => {
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
    .eql([{ id: "transcript", label: "Transcript", template: undefined }]);

  await validateTextContent(t, RenderedCertificate, [
    "A0056627Y, NAME",
    "A0056627Y",
    "01/01/1905",
    "11/07/2019",
    "BACHELOR OF ENGINEERING (MECHANICAL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "2009/2010 SEMESTER 1",
    "MA1301",
    "INTRODUCTORY MATHEMATICS",
    "2009/2010 SEMESTER 2",
    "MA1505",
    "MATHEMATICS I",
    "2010/2011 SEMESTER 1",
    "MA1505",
    "MATHEMATICS I",
    "2010/2011 SEMESTER 2",
    "ME2114",
    "MECHANICS OF MATERIALS II",
    "2011/2012 SEMESTER 1",
    "MA1505",
    "MATHEMATICS I",
    "2011/2012 SEMESTER 2",
    "EG2401",
    "ENGINEERING PROFESSIONALISM",
    "2012/2013 SEMESTER 1",
    "GEK1521",
    "PHYSICS IN THE LIFE SCIENCES",
    "2012/2013 SEMESTER 2",
    "LAK1201",
    "KOREAN 1"
  ]);
});
