import {
    useBlockProps,
    useInnerBlocksProps,
    ButtonBlockAppender,
    store as blockEditorStore,
} from "@wordpress/block-editor";
import SliderInspectorControls from "./inspector-controls";
import SliderBlockControls from "./block-controls";
import SliderPlaceHolder from "./placeholder";
import { getSliderStyleFromOptions, useHasTemplateLock } from "./util";
import { useSelect } from "@wordpress/data";

const SLIDE_BLOCK = "good-slider/slide";

const Edit = ( { clientId, attributes, setAttributes } ) => {
    const { swiperOptions = {}, templateLock } = attributes;
    const blockProps = useBlockProps( {
        className: "wp-block-good-slider",
    } );
    const shouldRenderAppender = useHasTemplateLock( clientId );

    const hasInnerBlocks = useSelect(
        ( select ) =>
            select( blockEditorStore ).getBlocks( clientId ).length > 0,
        [ clientId ]
    );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: "wp-block-good-slider__slides",
            style: getSliderStyleFromOptions( swiperOptions ),
        },
        {
            // Hardcoded here, because we need this block because of its swiper-slide class and for sizing.
            allowedBlocks: [ SLIDE_BLOCK ],
            orientation: "horizontal",
            placeholder: (
                <SliderPlaceHolder
                    clientId={ clientId }
                    insertBlock={ SLIDE_BLOCK }
                />
            ),
            defaultBlock: {
                name: SLIDE_BLOCK,
            },
            // directInsert: true,
            // Avoid template sync when the `templateLock` value is `all` or `contentOnly`.
            // See: https://github.com/WordPress/gutenberg/pull/45632
            template: ! hasInnerBlocks ? [ [ SLIDE_BLOCK ] ] : undefined,
            templateLock,
            renderAppender: false, // messes with flex of slider
            __experimentalCaptureToolbars: true,
        }
    );

    return (
        <>
            <SliderInspectorControls
                attributes={ attributes }
                setAttributes={ setAttributes }
            />
            <SliderBlockControls clientId={ clientId } />
            <div { ...blockProps }>
                <div { ...innerBlocksProps } />
                { shouldRenderAppender && (
                    <ButtonBlockAppender
                        className="slider-appender has-icon"
                        rootClientId={ clientId }
                    />
                ) }
            </div>
        </>
    );
};

export default Edit;
