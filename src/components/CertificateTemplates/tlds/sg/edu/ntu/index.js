import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NTU2019UG = dynamic(() =>
  import("./2019-July-NTU-UG" /* webpackChunkName: "ntu-Templates" */)
);

const templates = {
  "2019-ntu-degree": NTU2019UG
};

export default addDirToTemplatePath("ntu", templates);
