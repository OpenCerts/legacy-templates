import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NUSK12019 = dynamic(() =>
  import("./NUS-K1-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK1NOTS2019 = dynamic(() =>
  import("./NUS-K1NOTS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK3MBBS2019 = dynamic(() =>
  import("./NUS-K3MBBS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK2SMA2019 = dynamic(() =>
  import("./NUS-K2SMA-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK4MBACN2019 = dynamic(() =>
  import("./NUS-K4MBACN-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK6CAAS2019 = dynamic(() =>
  import("./NUS-K6CAAS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK7MPAS2019 = dynamic(() =>
  import("./NUS-K7MPAS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSTSGENERAL2019 = dynamic(() =>
  import("./NUSTS-GENERAL-2019" /* webpackChunkName: "NUSTemplates" */)
);

const templates = {
  "NUS-K1-2019": NUSK12019,
  "NUS-K1NOTS-2019": NUSK1NOTS2019,
  "NUS-K3MBBS-2019": NUSK3MBBS2019,
  "NUS-K2SMA-2019": NUSK2SMA2019,
  "NUS-K4MBACN-2019": NUSK4MBACN2019,
  "NUS-K6CAAS-2019": NUSK6CAAS2019,
  "NUS-K7MPAS-2019": NUSK7MPAS2019,
  "NUSTS-GENERAL-2019": NUSTSGENERAL2019
};

export default addDirToTemplatePath("nus", templates);
