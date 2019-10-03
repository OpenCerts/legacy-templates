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

test("NUS-YALE-2019 certificate is rendered correctly", async t => {
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
    "National University of Singapore",
    "A0132190U, name",
    "Bachelor",
    "Arts",
    "Honours"
  ]);
  await t.eval(() => window.opencerts.selectTemplateTab(1));
  await validateTextContent(t, RenderedCertificate, [
    "A0132190U, name",
    "A0132190U",
    "01/01/1905",
    "11/09/2019",
    "BACHELOR OF ARTS WITH HONOURS",
    "COMPLETED PROGRAMME",
    "2014/2015 SEMESTER 1",
    "YCC1111",
    "Literature and Humanities 1",
    "YCC1113",
    "Philosophy and  Political Thought 1",
    "YCC1121",
    "Comparative Social Institutions",
    "YCC1131",
    "Scientific Inquiry",
    "2014/2015 SEMESTER 2",
    "YCC1112",
    "Literature and Humanities 2",
    "YCC1114",
    "Philosophy and  Political Thought 2",
    "YCC1122",
    "Quantitative Reasoning",
    "YSS1203",
    "Principles of Economics",
    "YSS1205",
    "Introduction to Game Theory",
    "2015/2016 SEMESTER 1",
    "YCC2121",
    "Modern Social Thought",
    "YCC2131",
    "Foundations of Science 1",
    "YSC1206",
    "Conceptual Calculus",
    "YSH2416",
    "Short Course: International Law",
    "YSS2201",
    "Understanding Behaviour and Cognition",
    "YSS2203",
    "Intermediate Microeconomics",
    "2015/2016 SEMESTER 2",
    "YCC2132",
    "Foundations of Science 2",
    "YHU2206",
    "Introduction to Mathematical Logic",
    "YIR2321",
    "Independent Reading and Research (Sem 2)",
    "YSS2211",
    "Econometrics",
    "YSS2214",
    "Intermediate Macroeconomics",
    "2016/2017 SEMESTER 1",
    "ACC1002X",
    "Financial Accounting",
    "YHU2223",
    "Documentary Photography",
    "YSH2438",
    "Introduction to Financial Markets 1",
    "YSS3243",
    "Public Economics",
    "YSS4204",
    "Colonialism: Economic, Political and Social Effects",
    "2016/2017 SEMESTER 2",
    "2017/2018 SEMESTER 1",
    "YSS3203",
    "Behavioral Economics",
    "YSS3207",
    "Advanced Econometrics",
    "YSS3244",
    "Labour Economics",
    "YSS4104",
    "Economics Capstone Project",
    "2017/2018 SEMESTER 2",
    "YHU3225",
    "Pompeii: Art, Urban Life & Culture in the Roman Empire",
    "YSC3222",
    "Tobacco: A Social Policy Perspective",
    "YSS4104",
    "Economics Capstone Project",
    "YSS4238",
    "Micro-Finance and Sustainable Development in Asia"
  ]);
});
