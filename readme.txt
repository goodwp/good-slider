=== Good Slider ===
Contributors:      goodwpio, gaambo
Tags:              block, slider, swiper
Requires at least: 6.2
Tested up to:      6.5
Stable tag:        2.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A simple and extendable slider block based on Swiper.

== Description ==

This plugin provides a very simple slider block which is based on [Swiper](https://swiperjs.com/).
As of now, the plugin does not provide any slider configuration in the editor UI but provides many **PHP filter hooks** to change its behaviour.

The plugin is used in some custom themes and through it's PHP configuration it's perfect for a locked-in design (eg agency, clients).
Through the filters it's also very easy to extend in your own functions.php file.

== Installation ==

= Minimal Requirements =

- PHP 7.4 or newer
- WordPress 6.0 or newer

= Automatic Installation =

We recommend installing the plugin extension through the WordPress Backend.

= Manual Installation =

1. Upload the contents of the plugin zip file to the `/wp-content/plugins/` directory.
2. Activate the plugin through the Plugins menu in WordPress.

== Screenshots ==

1. Insert the Good Slider block into your content.
2. Add slides to your slider and insert any block you like into a slide.
3. The slide block also allows setting a background color and text color, so you don't need a group/cover block inside.

== Frequently Asked Questions ==

= How can I change the swiper arguments (like slides shown etc) =

As of now, there are no configuration UIs in the editor.
You can use the `good-slider/swiper-options` filter hook to set the swiper configuration for a specific block instance.
All the available arguments are documented in the [Swiper documentation](https://swiperjs.com/swiper-api).

= Can I use my own enqueued Swiper script? =

Yes you can use the `good-slider/swiper-script-handle` filter hook to change the name of the swiper script handle.

= Can I use more Swiper options? =

By default, a stripped-down version of Swiper is enqueued, which only includes the most commonly used modules (A11y, Keyboard, Lazy, Navigation, Pagination).
You can use the `good-slider/swiper-script-handle` filter and set it to `good-slider-swiper-full` to enqueue the full Swiper bundle with all modules or you can use or own (see above).

= Will there be a UI for the block in the editor? =

Yes, we are working on exposing the most common configuration options (slides shown, spacing, colors,...) via the block's settings.

== Changelog ==

= 2.0.0 (2023-11-01) =
!! Some breaking changes:

- Tweak: Changed block supports for slider and item block
  - Slider block:
     - Supports anchor/ID
     - Supports background image
     - Supports all colors (background, gradients, heading, button, link, text)
     - Supports minimum height
     - Supports top+bottom padding and margin
     - Supports typography
  - Slider item block
     - Supports anchor/ID
     - Supports background image
     - Supports all colors (background, gradients, heading, button, link, text)
     - Supports minimum height
     - Supports padding (all sides)
     - Supports typography
- Tweak: Changed class name of main wrapper block to `wp-block-good-slider`.
  The old classes were `wp-block-good-slider-slider` + `good-slider` and are not set on the block anymore.
  A block deprecation was added to migrate blocks when viewing in editor.
- Compatibility: Requires WordPress 6.2 (because of WP HTML Tag Manager)
- Compatibility: Tested up to WordPress 6.4
- Dev: Update @wordpress packages.

= 1.3.1 (2023-10-04) =
- Fix: Fix swiper-full bundle not working (because Swiper is not exported to window).

= 1.3.0 (2023-08-02) =
- Tweak/Fix: Disable left & right padding for slide-item block, because they break the slider layout
- Compatibility: Tested up to WordPress 6.3

= 1.2.0 (2023-03-08) =
* Add a server side render callback to the item block
* Prevent empty item/slides from rendering

= 1.1.0 (2022-12-09) =
* Added JavaScript filters to filter `InnerBlocks` settings/props for slider and item block.

= 1.0.0 (2022-11-28) =
* The first public release of the plugin 🥳
