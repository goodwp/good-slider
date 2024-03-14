/**
 * A slimmed down version of Swiper
 * including only Swiper core, navigation (arrows), pagination (bullets), keyboard and a11y
 */
import { Swiper, A11y, Keyboard, Lazy, Navigation, Pagination } from "swiper";

import "./style.scss";

Swiper.use( [ A11y, Keyboard, Lazy, Navigation, Pagination ] );

window.Swiper = Swiper;
