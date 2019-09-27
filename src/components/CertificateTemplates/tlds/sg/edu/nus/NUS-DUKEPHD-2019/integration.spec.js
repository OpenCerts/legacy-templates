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

test("NUS-DUKEPHD-2019 certificate is rendered correctly", async t => {
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
    "A0090502U, NAME",
    "Doctor",
    "Philosophy",
    "31 July 2018"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0090502U, name",
    "A0090502U",
    "01/01/1905",
    "11/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2013/2014",
    "GMS6900",
    "Student Research Seminars",
    "GMS6901",
    "Molecules to Medicines",
    "GMS6902",
    "Laboratory Rotation 1",
    "GMS6903",
    "Laboratory Rotation 2",
    "GMS6904",
    "Principles of Infectious Diseases",
    "2014/2015",
    "GMS6900",
    "Student Research Seminars",
    "GMS6910",
    "Evolutionary Genetics",
    "2015/2016",
    "GMS6900",
    "Student Research Seminars",
    "2016/2017 SEMESTER 1",
    "GMS6900",
    "Student Research Seminars",
    "2017/2018 SEMESTER 2",
    "GMS6991",
    "Thesis"
  ]);
});
