<?php
/**
 * The slider block
 *
 * @package GoodWP\GoodSlider
 */

namespace GoodWP\GoodSlider\Blocks\Slide;

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
 * @param string $content The saved block content/HTML/innerBlocks.
 * @return string
 */
function render_block( array $attributes, string $content ): string {
	// Prevent empty slides from rendering.
	if ( trim( $content ) === '' ) {
		return '';
	}

	$block_wrapper_attributes = [
		'class' => 'wp-block-good-slider__slide swiper-slide',
	];

	if ( ! empty( $attributes['contentPosition'] ) ) {
		$block_wrapper_attributes['style'] = get_content_position_styles( $attributes['contentPosition'] );
	}
	return sprintf(
		'<div %1$s>
                %2$s
        </div>',
		get_block_wrapper_attributes( $block_wrapper_attributes ),
		$content // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	);
}

/**
 * Helper function to get the CSS variables for the content position
 *
 * @param string $content_position From BlockAlignmentMatrixControl in format "top center"|"center".
 * @return string String with CSS variables to be used as inline style.
 */
function get_content_position_styles( string $content_position ): string {
	$position_y_map = [
		'top'    => 'flex-start',
		'center' => 'center',
		'bottom' => 'flex-end',
	];

	$position_x_map = [
		'left'   => 'flex-start',
		'center' => 'center',
		'right'  => 'flex-end',
	];
	if ( $content_position === 'center' ) {
		return '--content-position-x: center; --content-position-y: center;';
	} else {
		$positions = explode( ' ', $content_position );
		if ( count( $positions ) < 2 ) {
			return '';
		}
		$position_y = $position_y_map[ $positions[0] ] ?? 'center';
		$position_x = $position_x_map[ $positions[1] ] ?? 'center';

		return "--content-position-x: {$position_x}; --content-position-y: {$position_y};";
	}
}
