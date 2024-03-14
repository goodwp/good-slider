import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

const getSliderStyleFromOptions = ( options ) => {
    const style = {};
    style[ "--slides-per-view" ] = options?.slidesPerView || 1;
    return style;
};

const useHasTemplateLock = ( clientId ) => {
    return useSelect(
        ( select ) => {
            const { getTemplateLock } = select( blockEditorStore );
            return ! getTemplateLock( clientId );
        },
        [ clientId ]
    );
};

export { getSliderStyleFromOptions, useHasTemplateLock };
