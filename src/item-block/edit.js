import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        __experimentalCaptureToolbars: false,
    });
    return <div {...innerBlocksProps} />;
}
