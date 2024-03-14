<?php
/**
 * Plugin Name:       Good Slider
 * Description:       A simple and extendable slider block using Swiper
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Version:           3.0.0
 * Author:            GoodWP
 * Author URI:        https://goodwp.io
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       good-slider
 * Domain Path:       /languages
 *
 * @package           GoodWP\GoodSlider
 */

namespace GoodWP\GoodSlider;

/**
 * Loads the plugin text domain for translation.
 *
 * @wp-hook
 * @return void
 */
function load_languages(): void {
	load_plugin_textdomain(
		'good-slider',
		false,
		dirname( plugin_dir_path( __FILE__ ) ) . 'languages'
	);
}

add_action( 'init', __NAMESPACE__ . '\load_languages' );

/**
 * Register swiper and frontend assets
 *
 * @wp-hook
 * @return void
 */
function register_assets(): void {
	/**
	 * 1. Plugin's swiper script & styles,
	 * can be disabled, see good-slider/swiper-script-handle filter below and in renderSliderBlock
	 */
	$swiper_asset_file = plugin_dir_path( __FILE__ ) . 'build/swiper.asset.php';
	$swiper_asset_data = require $swiper_asset_file;

	/**
	 * Standard swiper config with most used modules
	 */
	wp_register_script(
		'good-slider-swiper',
		plugins_url( 'build/swiper.js', __FILE__ ),
		$swiper_asset_data['dependencies'],
		'8.4.4', // Use swiper version.
		true
	);

	wp_register_style(
		'good-slider-swiper',
		plugins_url( 'build/style-swiper.css', __FILE__ ),
		[],
		'8.4.4' // Use swiper version.
	);

	/**
	 * Complete swiper with all modules
	 */
	wp_register_script(
		'good-slider-swiper-full',
		plugins_url( 'build/swiper-full.js', __FILE__ ),
		$swiper_asset_data['dependencies'],
		'8.4.4', // Use swiper version.
		true
	);

	wp_register_style(
		'good-slider-swiper-full',
		plugins_url( 'build/swiper-full.css', __FILE__ ),
		[],
		'8.4.4' // Use swiper version.
	);

	/**
	 * 2. Plugins frontend js
	 * Do not add as file-viewScript to block but with asset handle,
	 * because needs to be registered with custom swiper handle
	 */
	$script_asset_file   = plugin_dir_path( __FILE__ ) . 'build/frontend.asset.php';
	$scrip_asset_data    = require $script_asset_file;
	$script_dependencies = $scrip_asset_data['dependencies'];

	/**
	 * This filter is documented in Blocks\Slider\render_block (src/blocks/slider/index.php#40ff)
	 * use good-slider-swiper or good-slider-swiper-full for examples
	 */
	$swiper_script_handle = apply_filters( 'good-slider/swiper-script-handle', 'good-slider-swiper' );
	if ( $swiper_script_handle ) {
		$script_dependencies[] = $swiper_script_handle;
	}
	wp_register_script(
		'good-slider',
		plugins_url( 'build/frontend.js', __FILE__ ),
		$script_dependencies,
		$scrip_asset_data['version'],
		true
	);
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\register_assets' );

require_once plugin_dir_path( __FILE__ ) . 'build/blocks/slider/index.php';
require_once plugin_dir_path( __FILE__ ) . 'build/blocks/slide/index.php';
// Deprecated. Remove in 3.1.0.
require_once plugin_dir_path( __FILE__ ) . 'build/blocks/item/index.php';
