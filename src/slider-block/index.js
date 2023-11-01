import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";

import Edit from "./edit";
import save from "./save";
import deprecations from "./deprecations";
import metadata from "./block.json";

registerBlockType(metadata.name, {
    deprecated: deprecations,
    edit: Edit,
    save,
});
