import { useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { Button, Placeholder } from "@wordpress/components";
import { BlockIcon, store as blockEditorStore } from "@wordpress/block-editor";
import { addCard as addSlideIcon } from "@wordpress/icons";
import { __, _x } from "@wordpress/i18n";

const SliderPlaceHolder = ( { clientId, insertBlock } ) => {
    const { replaceInnerBlocks } = useDispatch( blockEditorStore );

    const addSlide = () => {
        replaceInnerBlocks(
            clientId,
            [ createBlock( insertBlock, {}, [] ) ],
            true
        );
    };
    return (
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
};

export default SliderPlaceHolder;
