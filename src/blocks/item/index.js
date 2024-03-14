import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import metadata from "./block.json";
import save from "./save";

/**
 * @deprecated 3.0.0 Use good-slider/slide block instead
 */
registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
