import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";

const PRE_3_ATTRS = {
    tagName: {
        type: "string",
        default: "div",
    },
};

const deprecations = [
    // Before 3.0.0, wrapper div, fewer supports, other class name
    // Also migrates good-slider/item to good-slider/slide
    {
        attributes: PRE_3_ATTRS,
        supports: {
            align: [ "wide", "full" ],
            anchor: true,
            background: {
                backgroundImage: true,
            },
            className: false,
            color: {
                background: true,
                gradients: true,
                heading: true,
                button: true,
                link: true,
                text: true,
                __experimentalDefaultControls: {
                    background: true,
                    text: true,
                },
            },
            dimensions: {
                minHeight: true,
            },
            html: false,
            layout: false,
            spacing: {
                padding: [ "top", "bottom" ],
                margin: [ "top", "bottom" ],
                blockGap: false,
                __experimentalDefaultControls: {
                    padding: true,
                    blockGap: false,
                },
            },
            typography: {
                fontSize: true,
                lineHeight: true,
            },
        },
        save: ( { attributes: { tagName: Tag } } ) => {
            return (
                <Tag
                    { ...useInnerBlocksProps.save(
                        useBlockProps.save( {
                            className: "wp-block-good-slider",
                        } )
                    ) }
                />
            );
        },
        migrate: ( attributes, innerBlocks ) => {
            const migratedInnerBlocks = innerBlocks.map( ( slideItem ) =>
                createBlock(
                    "good-slider/slide",
                    { ...slideItem.attributes },
                    slideItem.innerBlocks
                )
            );

            return [
                {
                    ...attributes,
                },
                migratedInnerBlocks,
            ];
        },
    },
    // Before 1.4.0 - minimal supports, other class name
    {
        attributes: PRE_3_ATTRS,
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
