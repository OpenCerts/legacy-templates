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

test("NUS-DTUJDP-2019 certificate is rendered correctly", async t => {
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
    "A0080715J, NAME",
    "Doctor",
    "Philosophy",
    "30 September 2015"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0080715J, name",
    "A0080715J",
    "01/01/1905",
    "11/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2010/2011 SEMESTER 2",
    "BPS5102",
    "Climate Change and the Built Environment",
    "BPS5204",
    "Energy Efficiency and Renewable Energy in Buildings",
    "2011/2012 SEMESTER 1",
    "BPS5103",
    "Green Building Integration and Evaluation Studio",
    "BPS5300",
    "Topics in Building Performance and Sustainability",
    "PM5112",
    "RESEARCH METHODS",
    "2011/2012 SEMESTER 2",
    "BPS5103",
    "Green Building Integration and Evaluation Studio",
    "ES5001A",
    "GRADUATE ENGLISH COURSE (INTERMEDIATE LEVEL)",
    "2012/2013 SEMESTER 1",
    "BS6770",
    "PHD SEMINAR",
    "2012/2013 SEMESTER 2",
    "BS6770",
    "PHD SEMINAR",
    "2013/2014 SEMESTER 1",
    "2013/2014 SEMESTER 2"
  ]);
});
