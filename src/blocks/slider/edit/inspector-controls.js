import {
    BaseControl,
    PanelBody,
    PanelRow,
    RangeControl,
    ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
    columns as columnsIcon,
    desktop as desktopIcon,
    tablet as tabletIcon,
    mobile as mobileIcon,
    Icon,
} from "@wordpress/icons";

const SliderInspectorControls = ( { attributes, setAttributes } ) => {
    const { swiperOptions } = attributes;
    const setSwiperOption = ( key, value ) => {
        setAttributes( {
            swiperOptions: {
                ...swiperOptions,
                [ key ]: value,
            },
        } );
    };
    return (
        <InspectorControls group={ "settings" }>
            <PanelBody
                title={ __( "Slider Settings", "good-slider" ) }
                icon={ "slides" }>
                <PanelRow>
                    <ToggleControl
                        label={ __( "Navigation", "good-slider" ) }
                        checked={ swiperOptions?.navigation || false }
                        onChange={ ( value ) =>
                            setSwiperOption( "navigation", value )
                        }
                        help={ __(
                            "“Navigation” will display arrows so user can navigate forward/backward."
                        ) }
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        label={ __( "Pagination", "good-slider" ) }
                        checked={ swiperOptions?.pagination || false }
                        onChange={ ( value ) =>
                            setSwiperOption( "pagination", value )
                        }
                        help={ __(
                            "“Pagination” will display dots along the bottom for user to click through slides."
                        ) }
                    />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label={ __( "Slides Per View Desktop", "good-slider" ) }
                        help={ __(
                            "The number of slides to display per view on desktop.",
                            "good-slider"
                        ) }
                        min={ 1 }
                        max={ 10 } // Some kind of max default.
                        value={ swiperOptions?.slidesPerView || 1 }
                        onChange={ ( value ) =>
                            setSwiperOption( "slidesPerView", value )
                        }
                        icon={ columnsIcon }
                        withInputField={ false }
                        step={ 1 }
                        marks
                    />
                </PanelRow>
                <PanelRow>
                    <p>
                        { __(
                            "More settings can be set via the 'good-slider/swiper-options' PHP filter",
                            "good-slider"
                        ) }
                    </p>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
};

export default SliderInspectorControls;
