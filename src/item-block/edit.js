import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { applyFilters } from "@wordpress/hooks";

export default function Edit(props) {
    const blockProps = useBlockProps();
    const innerBlocksSettings = applyFilters(
        "good-slider.item.innerBlocks-settings",
        {
            __experimentalCaptureToolbars: false,
        },
        props
    );
    const innerBlocksProps = useInnerBlocksProps(blockProps, innerBlocksSettings);
    return <div {...innerBlocksProps} />;
}
