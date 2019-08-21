/* eslint-disable camelcase */
/* because we need to use _ to replace hyphens in dns */
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import edu from "./edu";
import gov from "./gov";
import co from "./co";

export default addDirToTemplatePath("sg", { ...edu, ...gov, ...co });
