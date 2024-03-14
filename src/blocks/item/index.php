<?php
/**
 * The slider block
 *
 * @deprecated 3.0.0
 * @package GoodWP\GoodSlider
 */

namespace GoodWP\GoodSlider\Blocks\Item;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets, so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 *
 * @deprecated 3.0.0
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
 * @param array  $attributes The block attributes.
 * @param string $content The saved block content/HTML/innerBlocks.
 * @return string
 * @deprecated 3.0.0 Use good-slider/slide block instead
 *
 * @wp-hook
 */
function render_block( array $attributes, string $content ): string {
	// prevent empty slides from rendering
	if ( trim( $content ) === '<div class="wp-block-good-slider-item"></div>' ) {
		return '';
	}
	return $content;
}
