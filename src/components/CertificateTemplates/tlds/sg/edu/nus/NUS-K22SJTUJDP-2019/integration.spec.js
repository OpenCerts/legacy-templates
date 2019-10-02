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

test("NUS-K22SJTUJDP-2019 certificate is rendered correctly", async t => {
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
    "A0000426B, NAME",
    "Doctor",
    "Philosophy",
    "30 April 2012"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0000426B, name",
    "A0000426B",
    "01/01/1905",
    "26/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2008/2009 SEMESTER 2",
    "EE5302",
    "MICROWAVE THEORY & TECHNIQUES",
    "EE5404",
    "SATELLITE COMMUNICATIONS",
    "EE6999",
    "DOCTORAL SEMINARS",
    "2009/2010 SEMESTER 1",
    "EE5308",
    "ANTENNA ENGINEERING",
    "EE6004",
    "Selected Advanced Topics In EM Modelling",
    "EE6999",
    "DOCTORAL SEMINARS",
    "2009/2010 SEMESTER 2",
    "EE5406",
    "Wireless Network Protocols",
    "EE5407",
    "ADAPTIVE & SPATIAL BASED WIRELESS SYSTEM",
    "EE6999",
    "DOCTORAL SEMINARS",
    "2010/2011 SEMESTER 1",
    "EE6999",
    "DOCTORAL SEMINARS",
    "2010/2011 SEMESTER 2",
    "EE6999",
    "DOCTORAL SEMINARS",
    "2011/2012 SEMESTER 1",
    "EE6999",
    "DOCTORAL SEMINARS"
  ]);
});
