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

test("NUS-ANUJDP-BA-2019 certificate is rendered correctly", async t => {
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
    "A0036825A, NAME",
    "Master",
    "Arts",
    "(Southeast",
    "Asian",
    "Studies)",
    "31 August 2016"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0036825A, name",
    "A0036825A",
    "01/01/1905",
    "11/09/2019",
    "MASTER OF ARTS (SOUTHEAST ASIAN STUDIES)",
    "COMPLETED PROGRAMME",
    "2015/2016 SEMESTER 1",
    "SE4218",
    "Majorities and Minorities in SE Asia",
    "SE4227",
    "Nationalism in Southeast Asia",
    "SE5151",
    "APPROACHES TO THE STUDY OF SOUTHEAST ASIA",
    "SE5213",
    "REVOLT AND REVOLUTION IN SOUTHEAST ASIA",
    "SE5242",
    "Country Studies: Thailand",
    "2015/2016 SEMESTER 2",
    "SE5101",
    "RESEARCH PROJECT",
    "2015/2016 SPECIAL TERM(PART 1)",
    "SE5101",
    "RESEARCH PROJECT",
    "2015/2016 SPECIAL TERM(PART 2)"
  ]);
});
