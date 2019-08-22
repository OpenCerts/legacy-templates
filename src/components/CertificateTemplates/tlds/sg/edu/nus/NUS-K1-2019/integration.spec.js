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

test("NUS-K1-2019 certificate is rendered correctly", async t => {
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
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL",
    "UNIVERSITY",
    "OF SINGAPORE",
    "A0058514E, NAME",
    "Bachelor",
    "of",
    "Business",
    "Administration",
    "30 June 2013"
  ]);
  await validateTextContent(t, RenderedCertificate, [
    "A0058514E, NAME",
    "A0058514E",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF BUSINESS ADMINISTRATION",
    "COMPLETED PROGRAMME",
    "2009/2010 SEMESTER 1",
    "ACC1002",
    "FINANCIAL ACCOUNTING",
    "2009/2010 SEMESTER 2",
    "BSP1005",
    "MANAGERIAL ECONOMICS",
    "2010/2011 SEMESTER 1",
    "ACC1006",
    "ACCOUNTING INFORMATION SYSTEMS",
    "2010/2011 SEMESTER 2",
    "ACC2002",
    "MANAGERIAL ACCOUNTING",
    "2011/2012 SEMESTER 1",
    "BSP2005",
    "ASIA PACIFIC BUSINESS ENVIRONMENT",
    "2011/2012 SEMESTER 2",
    "BSP3001C",
    "BUSINESS POLICY AND STRATEGY",
    "2012/2013 SEMESTER 1",
    "CH2243",
    "CHINESE IN SOUTHEAST ASIA",
    "2012/2013 SEMESTER 2",
    "CH3226",
    "MODERN CHINESE LITERATURE"
  ]);
});
