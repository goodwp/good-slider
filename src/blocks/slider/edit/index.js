import {
    useBlockProps,
    useInnerBlocksProps,
    ButtonBlockAppender,
} from "@wordpress/block-editor";
import SliderInspectorControls from "./inspector-controls";
import SliderBlockControls from "./block-controls";
import SliderPlaceHolder from "./placeholder";

const SLIDE_BLOCK = "good-slider/slide";

const getSliderStyleFromOptions = ( options ) => {
    const style = {};
    style[ "--slides-per-view" ] = options?.slidesPerView || 1;
    return style;
};

const Edit = ( { clientId, attributes, setAttributes } ) => {
    const blockProps = useBlockProps( {
        className: "wp-block-good-slider",
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: "wp-block-good-slider__slides",
            style: getSliderStyleFromOptions( attributes?.swiperOptions ),
        },
        {
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
            directInsert: true,
            template: [ [ SLIDE_BLOCK ] ],
            templateLock: false,
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
                <ButtonBlockAppender
                    className="slider-appender has-icon"
                    rootClientId={ clientId }
                />
            </div>
        </>
    );
};

export default Edit;
