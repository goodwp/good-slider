import { useBlockProps, Warning } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function Edit( props ) {
    return (
        <div { ...useBlockProps( { className: "has-warning" } ) }>
            <Warning>
                { __(
                    `The slider-item block is deprecated, please use slide instead. Please save the post after the conversion.`
                ) }
            </Warning>
        </div>
    );
}
