import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import metadata from "./block.json";

const deprecations = [
    // Before 1.4.0
    {
        attributes: metadata.attributes,
        supports: {
            html: false,
            align: [ "wide", "full" ],
            spacing: {
                padding: false,
                margin: true,
                blockGap: true,
            },
        },
        save: ( { attributes: { tagName: Tag } } ) => {
            return (
                <Tag
                    { ...useInnerBlocksProps.save(
                        useBlockProps.save( { className: "good-slider" } )
                    ) }
                />
            );
        },
    },
];

export default deprecations;
