<?php

/**
 * Set swiper options on a per-block instance basis
 * based on a custom className
 */
add_filter('good-slider/swiper-options', function ($swiperOptions, $blockAttributes) {
    if (!empty($blockAttributes['className']) && str_contains($blockAttributes['className'], 'is-style-news-slider')) {
        return [
            'slidesPerView' => 1,
            'spaceBetween' => 20,
            'pagination' => true,
            'navigation' => false,
            'createElements' => true,
            'loop' => true,
            'breakpoints' => [
                '1024' => [
                    'pagination' => false,
                ]
            ]
        ];
    }
    return $swiperOptions;
}, 10, 2);
