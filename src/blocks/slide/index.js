import { registerBlockType } from "@wordpress/blocks";
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";

import Edit from "./edit";
import metadata from "./block.json";

registerBlockType( metadata.name, {
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );
