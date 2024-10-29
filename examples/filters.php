<?php

/**
 * Set swiper options on a per-block instance basis
 * based on a custom className
 */
add_filter(
	'good-slider/swiper-options',
	function ( $swiper_options, $block_attributes ) {
		if ( ! empty( $block_attributes['className'] ) && str_contains( $block_attributes['className'], 'is-style-news-slider' ) ) {
			return [
				'slidesPerView'  => 1,
				'spaceBetween'   => 20,
				'pagination'     => true,
				'navigation'     => false,
				'createElements' => true,
				'loop'           => true,
				'breakpoints'    => [
					'1024' => [
						'pagination' => false,
					],
				],
			];
		}
		return $swiper_options;
	},
	10,
	2
);
