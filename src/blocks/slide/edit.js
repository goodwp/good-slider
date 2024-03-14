import {
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
    BlockControls,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { getContentPositionStyles } from "./util";

export default function Edit( { attributes, setAttributes } ) {
    const { contentPosition, templateLock } = attributes;
    const contentPositionStyles = getContentPositionStyles( contentPosition );
    const blockProps = useBlockProps( {
        style: contentPositionStyles,
        className: "wp-block-good-slider__slide swiper-slide",
    } );
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        template: [
            [
                "core/paragraph",
                {
                    align: "center",
                    placeholder: __( "Write title…" ),
                    ...attributes,
                },
            ],
        ],
        templateLock, // By default if = null -> inherit.
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
