import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');
const MohLogo = Selector('img[title="Ministry of Health"]');
const NeaLogo = Selector('img[title="National Environment Agency"]');
const NparkLogo = Selector('img[title="National Parks"]');
const SfaLogo = Selector('img[title="Singapore Food Agency"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Joint Specialist Diploma with SUSS is rendered correctly.", async t => {
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
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  await t.expect(TpLogo.exists).ok();
  await t.expect(MohLogo.exists).ok();
  await t.expect(NeaLogo.exists).ok();
  await t.expect(NparkLogo.exists).ok();
  await t.expect(SfaLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY COURSE NAME",
    "Temasek Polytechnic",
    "Principal",
    "Registrar",
    "The programme is supported by"
  ]);

  // Navigate to next tab using window.opencerts.selectTemplateTab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "ACADEMIC TRANSCRIPT",
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "DUMMY COURSE NAME",
    "Dummy Modular Certificate Name 1",
    "S001",
    "Dummy01 subject name",
    "Cumulative Grade Point Average",
    "5.00",
    "Certificate/Diploma Awarded",
    "Dummy Modular Certificate Name 1",
    "Dummy Modular Certificate Name 2",
    "Dummy Modular Certificate Name 3",
    "Dummy Post Diploma Certificate Name 4",
    "Dummy Post Diploma Certificate Name 5",
    "DUMMY COURSE NAME",
    "WITH MERIT",
    "Grading System"
  ]);
});
