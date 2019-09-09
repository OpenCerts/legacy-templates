import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const SMUCERT1 = dynamic(() =>
  import("./degree-cert-template1" /* webpackChunkName: "smu-Templates" */)
);
const SMUCERT2 = dynamic(() =>
  import("./degree-cert-template2" /* webpackChunkName: "smu-Templates" */)
);
const SMUCERT3 = dynamic(() =>
  import("./degree-cert-template3" /* webpackChunkName: "smu-Templates" */)
);
const SMUTRANSC = dynamic(() =>
  import("./transcript-template" /* webpackChunkName: "smu-Templates" */)
);

const templates = {
  "degree-cert-template1": SMUCERT1,
  "degree-cert-template2": SMUCERT2,
  "degree-cert-template3": SMUCERT3,
  "transcript-template": SMUTRANSC
};

export default addDirToTemplatePath("smu", templates);
