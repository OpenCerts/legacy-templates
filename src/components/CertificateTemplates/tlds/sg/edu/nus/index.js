import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NUSK12019 = dynamic(() =>
  import("./NUS-K1-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSTSGENERAL2019 = dynamic(() =>
  import("./NUSTS-GENERAL-2019" /* webpackChunkName: "NUSTemplates" */)
);

const templates = {
  "NUS-K1-2019": NUSK12019,
  "NUSTS-GENERAL-2019": NUSTSGENERAL2019
};

export default addDirToTemplatePath("nus", templates);
