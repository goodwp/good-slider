import { __, _x } from "@wordpress/i18n";
import {
    useBlockProps,
    useInnerBlocksProps,
    BlockIcon,
    store as blockEditorStore,
    InspectorControls,
    BlockControls,
    useBlockEditContext,
    ButtonBlockAppender,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import {
    Button,
    Placeholder,
    PanelBody,
    PanelRow,
    ToggleControl,
    ToolbarGroup,
    ToolbarButton,
} from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { addCard as addSlideIcon } from "@wordpress/icons";

import "./editor.scss";

/**
 * Slider Toolbar - '+ Add a Slide'
 *
 * @param {string} clientId Block's clientsId.
 *
 * @return {JSX.Element} Returns ToolbarGroup.
 */
const SliderToolbar = ( { clientId } ) => {
    const { insertBlock, selectBlock } = useDispatch( blockEditorStore );
    const innerBlocks = useSelect(
        (
            select // eslint-disable-line no-shadow
        ) => select( blockEditorStore ).getBlock( clientId ).innerBlocks,
        [ clientId ]
    );

    // Create a Slide block and insert it.
    const addSlide = () => {
        const block = createBlock( "good-slider/slide" );
        insertBlock( block, innerBlocks.length, clientId, false );
        selectBlock( block.clientId );
    };

    return (
        <ToolbarGroup>
            <ToolbarButton
                icon={ addSlideIcon }
                onClick={ addSlide }
                label={ __( "Add Slide", "good-slider" ) }
            />
        </ToolbarGroup>
    );
};

const Edit = ( props ) => {
    const { attributes, setAttributes } = props;
    const { replaceInnerBlocks } = useDispatch( blockEditorStore );

    const addSlide = () => {
        replaceInnerBlocks(
            clientId,
            [ createBlock( "good-slider/slide", {}, [] ) ],
            true
        );
    };
    const SliderPlaceHolder = (
        <Placeholder
            icon={ <BlockIcon icon={ addSlideIcon } showColors /> }
            label={ _x(
                "Good Slider",
                "block placeholder label",
                "good-slider"
            ) }
            instructions={ __(
                "Add a slide block to start creating your slider.",
                "good-slider"
            ) }>
            <Button onClick={ addSlide } variant="primary">
                { __( "Add Slide", "good-slider" ) }
            </Button>
        </Placeholder>
    );

    const blockProps = useBlockProps( {
        className: "wp-block-good-slider",
    } );

    const innerBlocksProps = useInnerBlocksProps(
        { className: "wp-block-good-slider__slides" },
        {
            orientation: "horizontal",
            placeholder: SliderPlaceHolder,
            defaultBlock: {
                name: "good-slider/slide",
            },
            directInsert: true,
            template: [ [ "good-slider/slide" ] ],
            templateLock: false,
            renderAppender: false, // messes with flex of slider
            __experimentalCaptureToolbars: true,
        }
    );

    const { navigation, pagination } = attributes;

    const swiperOptions = useMemo(
        () => ( { navigation, pagination } ),
        [ navigation, pagination ]
    );

    const { clientId } = useBlockEditContext();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( "Slider Settings", "good-slider" ) }>
                    <PanelRow>
                        <ToggleControl
                            label={ __( "Navigation", "good-slider" ) }
                            checked={ navigation }
                            onChange={ ( value ) =>
                                setAttributes( { navigation: value } )
                            }
                            help={ __(
                                "“Navigation” will display arrows so user can navigate forward/backward."
                            ) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={ __( "Pagination", "good-slider" ) }
                            checked={ pagination }
                            onChange={ ( value ) =>
                                setAttributes( { pagination: value } )
                            }
                            help={ __(
                                "“Pagination” will display dots along the bottom for user to click through slides."
                            ) }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <SliderToolbar clientId={ clientId } />
            </BlockControls>
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
