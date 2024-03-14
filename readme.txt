=== Good Slider ===
Contributors:      goodwpio, gaambo
Tags:              block, slider, swiper
Requires at least: 6.2
Requires PHP:      8.1
Tested up to:      6.5
Stable tag:        3.0.1
License:           GPL-3.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html

A simple and extendable slider block based on Swiper.

== Description ==

This plugin provides a very simple slider block which is based on [Swiper v8](https://swiperjs.com/).
The plugin provides a UI for the most common swiper options (navigation, pagination, slides per view). But it is specifically made to be extended via PHP.
Therefore, it provides many **PHP filter hooks** to change its behaviour.

The plugin is used in some custom themes and through it's PHP configuration it's perfect for a locked-in design (eg agency, clients).
Through the filters it's also very easy to extend in your own functions.php file.

== Installation ==

= Minimal Requirements =

- PHP 8.1 or newer
- WordPress 6.2 or newer

= Automatic Installation =

We recommend installing the plugin extension through the WordPress Backend.

= Manual Installation =

1. Upload the contents of the plugin zip file to the `/wp-content/plugins/` directory.
2. Activate the plugin through the Plugins menu in WordPress.

== Screenshots ==

1. Insert the Good Slider block into your content.
2. Add slides to your slider and insert any block you like into a slide.
3. The slide block also allows setting a background and text color, background image, spacing, typography etc. so you don't need a group/cover block inside.

== Frequently Asked Questions ==

= How can I change the swiper arguments (like slides shown etc) =

The UI currently allows for enabling/disabling navigation and pagination and the desktops default number of slides per view.

You can use the `good-slider/swiper-options` filter hook to set the swiper configuration for a specific block instance.
All the available arguments are documented in the [Swiper v8 documentation](https://v8.swiperjs.com/swiper-api).

= Can I use my own enqueued Swiper script? =

Yes you can use the `good-slider/swiper-script-handle` filter hook to change the name of the swiper script handle.

= Can I use more Swiper options? =

By default, a stripped-down version of Swiper is enqueued, which only includes the most commonly used modules (A11y, Keyboard, Lazy, Navigation, Pagination).
You can use the `good-slider/swiper-script-handle` filter and set it to `good-slider-swiper-full` to enqueue the full Swiper bundle with all modules, or you can use or own (see above).

= Will there be a UI for more settings the block in the editor? =

Thanks to recent additions to core, our slider and slide block now allow for setting most of the common styling settings:
- spacing
- colors (text, background, link)
- typography
- background image
- content positioning (justify-content + align-items)

Also, v3.0.0 introduced a UI for enabling/disabling some of the most common settings of Swiper (navigation, pagination, slides shown).

We are working on adding more UI controls but also providing the possibility for developers to disable them.

= How can I lock the editing experience (e.g. in patterns)? =

The block integrates with features WordPress core provides to lock and curate the editing experience.

**Template locking**
Both the slider and slide block have a `templateLock` attributes, which you can set in variations, patterns or templates to any of the values `[ "all", "insert", "contentOnly", false ]`.

See the [examples on GitHub](https://github.com/goodwp/good-slider/tree/main/examples).

**Example 1:** (fixed-slides.html) Create a slider with a fixed amount of slides, but flexible content of those slides:
Set the `templateLock` attribute to "all" on the slider block and to `false` on all slides.

**Allowed blocks**
Since WordPress 6.5 you can set a `allowedBlocks` setting on all instances of a block type upon registration.
If you want to globally restrict the allowed blocks inside slides, [have a look at this new feature](https://make.wordpress.org/core/2024/03/09/miscellaneous-editor-changes-in-wordpress-6-5/#support-for-new-allowedblocks-field-in-block-json).

**Example 2:** (allowed-blocks.html) Create a slider with restricted allowed blocks inside slides. Set the `allowedBlocks` attribute on the slide block to an array of allowed block types.

**Variations**
You can also create block variations of the slide block with the innerBlocks and attributes prefilled.
See slide-variations.js in the examples directory.

== Changelog ==

= 3.0.1 (2024-03-14) =

- Dev: Quick fix to remove some development files from the distributed plugin.

= 3.0.0 (2024-03-14) =
!! This version includes breaking changes !!

- New: A new `good-slider/slide` block is introduced. This block has better naming and more block supports.
- Breaking: The `good-slider/item` block is now deprecated. Upon opening the editor all instance will be converted to `good-slider/slide` blocks.
- Breaking: Remove the editor filters `good-slider.item.innerBlocks-settings` and `good-slider.slider.innerBlocks-settings`. Instead, use the new `templateLock` property of the slider and slide block and the `allowedBlocks` attribute for the slide block introduced in WordPress 6.5
- Breaking: Removed tag name selector from slider block. Instead, wrap it in a group.
- Tweak: Add more block supports to slide
- Tweak: Editing experience is now horizontal and works with scrolling.
- New: Adds UI controls for Swiper navigation, pagination and slides per view (+ sensible defaults for tablet/mobile)
- Dev: Add formatting for PHP, JS and CSS
- Dev: Better directory structure of blocks
- Dev: Add WordPress Playground blueprint for easy demo of plugin
- Dev: Migrate to WordPress code style
- Compatibility: Test up to WordPres 6.5
- License: Update to GPL v3

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
