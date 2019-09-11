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

test("NUS-K3MBBS-2019 certificate is rendered correctly", async t => {
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
    "A0119114R, NAME",
    "Bachelor",
    "Medicine",
    "Bachelor",
    "Surgery",
    "30 April 2018"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0119114R, name",
    "A0119114R",
    "01/01/1905",
    "11/09/2019",
    "BACHELOR OF MEDICINE AND BACHELOR OF SURGERY",
    "COMPLETED PROGRAMME",
    "2013/2014",
    "MD1140",
    "Normal Structure and Function",
    "2014/2015",
    "MD2140",
    "Abnormal Structure and Function",
    "MD2150",
    "Clinical Skills Foundation Programme",
    "2015/2016",
    "MD3140",
    "Core Clinical Practice",
    "2016/2017",
    "MD4140",
    "Acute and Specialty Clinical Practice",
    "MD4150",
    "Community Health Posting",
    "2017/2018",
    "MD4150",
    "Community Health Posting",
    "MD5140",
    "Medicine",
    "MD5150",
    "Surgery",
    "MD5160",
    "Electives"
  ]);
});
