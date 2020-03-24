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

test("NUS-UMJDP-2019 certificate is rendered correctly", async t => {
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
    "A0045456A, NAME",
    "Bachelor",
    "Engineering",
    "(Civil",
    "Engineering)",
    "30 June 2012"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0045456A, name",
    "A0045456A",
    "01/01/1905",
    "11/09/2019",
    "BACHELOR OF ENGINEERING (CIVIL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "2008/2009 SEMESTER 1",
    "CS1101C",
    "Programming Methodology",
    "EG1108",
    "Electrical Engineering",
    "MA1505",
    "Mathematics I",
    "MLE1101",
    "Introductory Materials Science And Engineering",
    "PC1431",
    "Physics IE",
    "2008/2009 SEMESTER 2",
    "EG1109",
    "Statics And Mechanics Of Materials",
    "EG1413",
    "Critical Thinking And Writing",
    "MA1506",
    "Mathematics II",
    "MNO1001",
    "Management And Organisation",
    "PC1432",
    "Physics IIE",
    "2009/2010 SEMESTER 1",
    "CE2134",
    "Hydraulics",
    "CE2155",
    "Structural Mechanics and Materials",
    "CE2184",
    "Infrastructure & The Environment",
    "CE2407",
    "Engineering & Uncertainty Analyses",
    "GEK2001",
    "Changing Landscapes of Singapore",
    "2009/2010 SEMESTER 2",
    "CE2112",
    "Soil Mechanics",
    "CE2183",
    "Construction Project Management",
    "CE3132",
    "Water Resources Engineering",
    "ESE3001",
    "Water Quality Engineering",
    "SSA2204",
    "Nation-Building in Singapore",
    "2009/2010 SPECIAL TERM (PART1)",
    "GEK1505",
    "Living with Mathematics",
    "2010/2011 SEMESTER 1",
    "2010/2011 SEMESTER 2",
    "2011/2012 SEMESTER 1",
    "2011/2012 SEMESTER 2",
    "CE4104",
    "B. Eng. Dissertation",
    "CE5603",
    "Engineering Economics & Project Evaluation",
    "EG2401",
    "Engineering Professionalism",
    "HR2002",
    "Human Capital in Organizations"
  ]);
});
