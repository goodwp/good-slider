// Creates a variation of the slide block, which has preset innerblocks and template lock enabled.
wp.blocks.registerBlockVariation( "good-slider/slide", {
    name: "news",
    title: "News Slide",
    description: "",
    isDefault: true,
    icon: "format-aside",
    innerBlocks: [
        [
            "core/media-text",
            { mediaPosition: "right" },
            [
                [ "core/heading", { level: 3 } ],
                [ "core/paragraph" ],
                [
                    "core/buttons",
                    { lock: { remove: false } },
                    [ [ "core/button" ] ],
                ],
            ],
        ],
    ],
    attributes: {
        templateLock: "all",
        className: "news",
    },
    isActive: ( blockAttributes, variationAttributes ) => {
        return (
            blockAttributes.className &&
            blockAttributes.className.includes( variationAttributes.className )
        );
    },
    scope: [ "block", "inserter" ],
} );
