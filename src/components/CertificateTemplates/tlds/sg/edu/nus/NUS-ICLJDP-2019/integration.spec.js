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

test("NUS-ICLJDP-2019 certificate is rendered correctly", async t => {
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
    "A0107691A, NAME",
    "Doctor",
    "Philosophy",
    "31 January 2018"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0107691A, name",
    "A0107691A",
    "01/01/1905",
    "11/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2012/2013 SEMESTER 2",
    "BL5198",
    "GRADUATE SEMINAR MODULE IN BIOLOGICAL SCIENCES",
    "BL5233",
    "Modeling in Environmental Biology with R",
    "GE5216",
    "GEOGRAPHY AND SOCIAL THEORY",
    "2012/2013 SPECIAL TERM (PART2)",
    "BL5212",
    "Critical Thinking in Biological Sciences",
    "2014/2015 SEMESTER 1",
    "BL5231",
    "Writing in the Biological Sciences",
    "2014/2015 SEMESTER 2",
    "2015/2016 SEMESTER 1",
    "2015/2016 SEMESTER 2"
  ]);
});
