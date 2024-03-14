import { registerBlockType, registerBlockVariation } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

import "./style.scss";

import Edit from "./edit";
import deprecations from "./deprecations";
import metadata from "./block.json";

registerBlockType( metadata.name, {
    deprecated: deprecations,
    edit: Edit,
    save: () => {
        return <InnerBlocks.Content />;
    },
} );

registerBlockVariation( metadata.name, {
    name: "slider",
    title: "3-slides Slider",
    attributes: {
        templateLock: "all",
    },
    innerBlocks: [
        [ "good-slider/slide" ],
        [ "good-slider/slide" ],
        [ "good-slider/slide" ],
    ],
} );
