import {
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
    BlockControls,
    store as blockEditorStore,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { getContentPositionStyles } from "./util";
import { useSelect } from "@wordpress/data";

const INNER_BLOCKS_TEMPLATE = [
    [
        "core/paragraph",
        {
            align: "center",
            placeholder: __( "Write title" ),
        },
    ],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { contentPosition, templateLock, allowedBlocks } = attributes;

    const hasInnerBlocks = useSelect(
        ( select ) =>
            select( blockEditorStore ).getBlocks( clientId ).length > 0,
        [ clientId ]
    );

    const contentPositionStyles = getContentPositionStyles( contentPosition );
    const blockProps = useBlockProps( {
        style: contentPositionStyles,
        className: "wp-block-good-slider__slide swiper-slide",
    } );
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        // Avoid template sync when the `templateLock` value is `all` or `contentOnly`.
        // See: https://github.com/WordPress/gutenberg/pull/45632
        template: ! hasInnerBlocks ? INNER_BLOCKS_TEMPLATE : undefined,
        templateLock, // By default if = null -> inherit.
        allowedBlocks,
    } );
    return (
        <>
            <BlockControls group="block">
                <BlockAlignmentMatrixControl
                    label={ __( "Change content position" ) }
                    value={ contentPosition }
                    onChange={ ( nextPosition ) =>
                        setAttributes( {
                            contentPosition: nextPosition,
                        } )
                    }
                />
            </BlockControls>
            <div { ...innerBlocksProps } />
        </>
    );
}
