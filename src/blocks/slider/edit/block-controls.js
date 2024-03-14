import {
    BlockControls,
    store as blockEditorStore,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { addCard as addSlideIcon } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { useHasTemplateLock } from "./util";

/**
 * Slider Toolbar - '+ Add a Slide'
 *
 * @param {string} clientId Block's clientsId.
 *
 * @return {JSX.Element} Returns ToolbarGroup.
 */
const SliderBlockControls = ( { clientId } ) => {
    const shouldRenderAppender = useHasTemplateLock( clientId );
    const { insertBlock } = useDispatch( blockEditorStore );
    // Create a Slide block and insert it.
    const addSlide = () => {
        const block = createBlock( "good-slider/slide" );
        insertBlock( block, undefined, clientId, true );
    };
    return (
        <BlockControls>
            <ToolbarGroup>
                { shouldRenderAppender && (
                    <ToolbarButton
                        icon={ addSlideIcon }
                        onClick={ addSlide }
                        label={ __( "Add Slide", "good-slider" ) }
                    />
                ) }
            </ToolbarGroup>
        </BlockControls>
    );
};

export default SliderBlockControls;
