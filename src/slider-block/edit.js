import { __, _x } from "@wordpress/i18n";
import {
    useBlockProps,
    useInnerBlocksProps,
    BlockIcon,
    store as blockEditorStore,
    InspectorControls,
    InnerBlocks,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { Button, Placeholder, SelectControl } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";

import "./editor.scss";

/**
 * Taken from core/group block
 */
const htmlElementMessages = {
    header: __(
        "The <header> element should represent introductory content, typically a group of introductory or navigational aids."
    ),
    main: __("The <main> element should be used for the primary content of your document only. "),
    section: __(
        "The <section> element should represent a standalone portion of the document that can't be better represented by another element."
    ),
    article: __("The <article> element should represent a self contained, syndicatable portion of the document."),
    aside: __(
        "The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
    ),
    footer: __(
        "The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.)."
    ),
};

export default function Edit(props) {
    const { clientId, attributes, setAttributes } = props;
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const addSlide = () => {
        replaceInnerBlocks(clientId, [createBlock("good-slider/item", {}, [])], true);
    };
    const SliderPlaceHolder = (
        <Placeholder
            icon={<BlockIcon icon="slides" showColors />}
            label={_x("Good Slider", "block placeholder label", "good-slider")}
            instructions={__("Add a Slide-Item block to start creating your slider.", "good-slider")}
        >
            <Button onClick={addSlide} variant="primary">
                {__("Add Slide", "good-slider")}
            </Button>
        </Placeholder>
    );

    const { tagName: TagName = "div" } = attributes;

    const blockProps = useBlockProps();
    const innerBlocksSettings = applyFilters(
        "good-slider.slider.innerBlocks-settings",
        {
            allowedBlocks: ["good-slider/item"],
            placeholder: SliderPlaceHolder,
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
            __experimentalCaptureToolbars: true
        },
        props
    );
    const innerBlocksProps = useInnerBlocksProps(blockProps, innerBlocksSettings);

    // TODO: before WordPress 6.5 remove __experimentalGroup; keep it now for backwards compatibility
    return (
        <>
            <InspectorControls __experimentalGroup="advanced" group="advanced">
                <SelectControl
                    label={__("HTML element")}
                    options={[
                        { label: __("Default (<div>)"), value: "div" },
                        { label: "<header>", value: "header" },
                        { label: "<main>", value: "main" },
                        { label: "<section>", value: "section" },
                        { label: "<article>", value: "article" },
                        { label: "<aside>", value: "aside" },
                        { label: "<footer>", value: "footer" },
                    ]}
                    value={TagName}
                    onChange={(value) => setAttributes({ tagName: value })}
                    help={htmlElementMessages[TagName]}
                />
            </InspectorControls>
            <div {...innerBlocksProps} />
        </>
    );
}
