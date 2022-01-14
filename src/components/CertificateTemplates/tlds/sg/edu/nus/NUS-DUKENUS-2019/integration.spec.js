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

test("NUS-DUKENUS-2019 certificate is rendered correctly", async t => {
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
    "A0053942E, name",
    "Doctor",
    "Medicine"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0053942E, name",
    "A0053942E",
    "01/01/1905",
    "11/09/2019",
    "DOCTOR OF MEDICINE",
    "COMPLETED PROGRAMME",
    "2014/2015",
    "GMS6100",
    "Foundations Course",
    "GMS6101",
    "Molecules, Cells and Tissues",
    "GMS6102",
    "Normal Body",
    "GMS6103",
    "Brain & Behavior",
    "GMS6104",
    "Body & Disease",
    "GMS6105",
    "Practice Course 1",
    "GMS6107",
    "Evidence Based Medicine",
    "2015/2016",
    "GMS6200",
    "Orientation to Clinical Year",
    "GMS6201",
    "Medicine Clerkship",
    "GMS6202",
    "Surgery Clerkship",
    "GMS6204",
    "Pediatrics Clerkship",
    "GMS6205",
    "Psychiatry Clerkship",
    "GMS6206",
    "Neurology Clerkship",
    "GMS6212",
    "Practice Course 2",
    "GMS6215",
    "Anesthesiology Program",
    "GMS6216",
    "Obstetrics & Gynecology Clerkship",
    "GMS6219",
    "Geriatrics & Nutrition",
    "GMS6228",
    "Radiology Program",
    "GMS6247",
    "Clinical Reflections",
    "GMS6276",
    "Cardiology Program",
    "GMS6298",
    "Clinical Oncology",
    "2016/2017",
    "GMS6225D",
    "Basic Radiology",
    "GMS6301",
    "Practice Course 3",
    "GMS6304",
    "Research Methods and Analysis",
    "GMS6310",
    "IRB Modules",
    "GMS6311",
    "Research Experience (Part 1)",
    "GMS6399D",
    "Independent Study",
    "GMS6403",
    "Critical Care Rotation",
    "GMS6404",
    "Musculoskeletal Rotation",
    "GMS6414",
    "Emergency Medicine",
    "2017/2018",
    "GMS6223B",
    "Paediatric Radiology",
    "GMS6224B",
    "Neuroradiology",
    "GMS6269B",
    "Dermatology",
    "GMS6273B",
    "Respiratory Medicine",
    "GMS6302",
    "Family Medicine Clerkship",
    "GMS6312",
    "Research Experience (Part 2)",
    "GMS6313",
    "Research Thesis",
    "GMS6401",
    "Medicine Sub-Internship",
    "GMS6402",
    "Surgery Sub-Internship",
    "GMS6410B",
    "Advance Clinical Practice",
    "GMS6411",
    "Student as Future Educator",
    "GMS6463B",
    "Haematology",
    "GMS6491B",
    "Sports Medicine @ CGH",
    "GMS6499",
    "Capstone",
    "GMS9902",
    "Transfer Credit (Elective)"
  ]);
});
