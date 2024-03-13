<?php
/**
 * The slider block
 *
 * @package GoodWP\GoodSlider
 */

namespace GoodWP\GoodSlider\Blocks\Slider;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets, so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 *
 * @wp-hook
 * @return void
 */
function register_block(): void {
	register_block_type(
		__DIR__,
		[
			'render_callback' => __NAMESPACE__ . '\render_block',
		]
	);
}

add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Render the block
 *
 * @wp-hook
 * @param array  $attributes The block attributes.
 * @param string $content The stored blocks content/HTML/innerBlocks.
 * @return string
 */
function render_block( array $attributes, string $content = '' ): string {
	/**
	 * Allows filtering the handle of the script to enqueue which contains swiper
	 *
	 * Default to using the plugins swiper asset
	 * return your own script handle to enqueue or a falsy value (eg __return_false) to prevent enqueueing
	 *
	 * @param string $script_handle
	 */
	$script_handle = apply_filters( 'good-slider/swiper-script-handle', 'good-slider-swiper' );
	if ( $script_handle ) {
		wp_enqueue_script( $script_handle );
	}

	/**
	 * Allows filtering the handle of the style to enqueue which contains swiper
	 *
	 * Default to using the plugins swiper asset
	 * return your own style handle to enqueue or a falsy value (eg __return_false) to prevent enqueueing
	 *
	 * use good-slider-swiper or good-slider-swiper-full for examples
	 *
	 * @param string $style_handle
	 * @param array $attributes the block instances attributes
	 */
	$style_handle = apply_filters( 'good-slider/swiper-style-handle', 'good-slider-swiper', $attributes );
	if ( $style_handle ) {
		wp_enqueue_style( $style_handle );
	}

	/**
	 * Allows filtering the configuration options passed to swiper
	 *
	 * @param array $options (@see https://swiperjs.com/swiper-api)
	 * @param array $attributes the block instances attributes
	 */
	$swiper_options = apply_filters(
		'good-slider/swiper-options',
		[
			'pagination'    => $attributes['pagination'] ?? false,
			'navigation'    => $attributes['navigation'] ?? false,
			'slidesPerView' => 1,
		],
		$attributes
	);

	return sprintf(
		'<div %1$s>
            <div class="wp-block-good-slider__slides swiper-wrapper">
                %2$s
            </div>
        </div>',
		get_block_wrapper_attributes(
			[
				'class'               => 'wp-block-good-slider swiper',
				'data-swiper-options' => wp_json_encode( $swiper_options ),
			]
		),
		$content // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	);
}
