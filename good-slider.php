<?php

/**
 * Plugin Name:       Good Slider
 * Description:       A simple and extendable slider block using Swiper
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Version:           1.3.1
 * Author:            GoodWP
 * Author URI:        https://goodwp.io
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       good-slider
 * Domain Path:       /languages
 *
 * @package           GoodWP\GoodSlider
 */

namespace GoodWP\GoodSlider;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function registerBlock()
{
    register_block_type(__DIR__ . '/build/slider-block', [
        'render_callback' => __NAMESPACE__ . '\renderSliderBlock'
    ]);

    register_block_type(__DIR__ . '/build/item-block', [
        'render_callback' => __NAMESPACE__ . '\renderItemBlock'
    ]);
}
add_action('init', __NAMESPACE__ . '\registerBlock');

function loadLanguages()
{
    load_plugin_textdomain(
        'good-slider',
        false,
        dirname(plugin_dir_path(__FILE__)) . 'languages'
    );
}
add_action('init', __NAMESPACE__ . '\loadLanguages');

function registerAssets()
{
    /**
     * 1. Plugin's swiper script & styles,
     * can be disabled, see good-slider/swiper-script-handle filter below and in renderSliderBlock
     */
    $swiperAssetFile = plugin_dir_path(__FILE__) . 'build/swiper.asset.php';
    $swiperAssetData = require $swiperAssetFile;

    /**
     * Standard swiper config with most used modules
     */
    wp_register_script(
        'good-slider-swiper',
        plugins_url('build/swiper.js', __FILE__),
        $swiperAssetData['dependencies'],
        '8.4.4', // use swiper version
        true
    );

    wp_register_style(
        'good-slider-swiper',
        plugins_url('build/style-swiper.css', __FILE__),
        [],
        '8.4.4' // use swiper version
    );

    /**
     * Complete swiper with all modules
     */
    wp_register_script(
        'good-slider-swiper-full',
        plugins_url('build/swiper-full.js', __FILE__),
        $swiperAssetData['dependencies'],
        '8.4.4', // use swiper version
        true
    );

    wp_register_style(
        'good-slider-swiper-full',
        plugins_url('build/swiper-full.css', __FILE__),
        [],
        '8.4.4' // use swiper version
    );

    /**
     * 2. Plugins frontend js
     * Do not add as file-viewScript to block but with asset handle,
     * because needs to be registerd with custom swiper handle
     */
    $scriptAssetFile = plugin_dir_path(__FILE__) . 'build/frontend.asset.php';
    $scriptAssetData = require $scriptAssetFile;
    $scriptDependencies = $scriptAssetData['dependencies'];
    /**
     * This filter is documented in renderSliderBlock (good-slider.php#108ff)
     * use good-slider-swiper or good-slider-swiper-full for examples
     */
    $swiperScriptHandle = apply_filters('good-slider/swiper-script-handle', 'good-slider-swiper');
    if ($swiperScriptHandle) {
        $scriptDependencies[] = $swiperScriptHandle;
    }
    wp_register_script(
        'good-slider',
        plugins_url('build/frontend.js', __FILE__),
        $scriptDependencies,
        $scriptAssetData['version'],
        true
    );
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\registerAssets');

/**
 * Render the block
 *
 * @param array $attributes
 * @param string $content
 * @return string
 */
function renderSliderBlock($attributes, $content)
{
    /**
     * Allows filtering the handle of the script to enqueue which contains swiper
     *
     * Default to using the plugins swiper asset
     * return your own script handle to enqueue or a falsy value (eg __return_false) to prevent enqueueing
     *
     * @param string $scriptHandle
     */
    $scriptHandle = apply_filters('good-slider/swiper-script-handle', 'good-slider-swiper');
    if ($scriptHandle) {
        wp_enqueue_script($scriptHandle);
    }

    /**
     * Allows filtering the handle of the style to enqueue which contains swiper
     *
     * Default to using the plugins swiper asset
     * return your own style handle to enqueue or a falsy value (eg __return_false) to prevent enqueueing
     *
     * use good-slider-swiper or good-slider-swiper-full for examples
     *
     * @param string $styleHandle
     * @param array $attributes the block instances attributes
     */
    $styleHandle = apply_filters('good-slider/swiper-style-handle', 'good-slider-swiper', $attributes);
    if ($styleHandle) {
        wp_enqueue_style($styleHandle);
    }

    /**
     * Allows filtering the configuration options passed to swiper
     *
     * @param array $options (@see https://swiperjs.com/swiper-api)
     * @param array $attributes the block instances attributes
     */
    $swiperOptions = apply_filters('good-slider/swiper-options', [], $attributes);

    $html = new \WP_HTML_Tag_Processor($content);
    if ($html->next_tag(['class' => 'wp-block-good-slider'])) {
        $html->set_attribute('data-swiper-options', wp_json_encode($swiperOptions));
    }
    return $html->get_updated_html();

    return $content;
}

/**
 * Render the block
 *
 * @param array $attributes
 * @param string $content
 * @return string
 */
function renderItemBlock($attributes, $content)
{
    // prevent empty slides from rendering
    if (trim($content) === '<div class="wp-block-good-slider-item"></div>') {
        return '';
    }
    return $content;
}
