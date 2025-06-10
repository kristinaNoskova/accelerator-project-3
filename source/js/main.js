import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { throttle } from './modules/throttle.js';
import {initCustomSelect} from './modules/custom-select.js';
import {
  initMobileMenu,
  initSubmenu,
  closeMenuOnOutsideClick
} from './modules/menu.js';
import {
  initHeroSlider,
  initProgramsSlider,
  initReviewsSlider
} from './modules/swiper.js';
import './modules/news-sliders.js';
import { initAccordeon, onResize } from './modules/accordeon.js';
import './modules/form-validate.js';
import './modules/modal.js';
const throttledResize = throttle(onResize, 200);

window.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSubmenu();
  closeMenuOnOutsideClick();
  initHeroSlider();
  initProgramsSlider();
  initAccordeon();
  initReviewsSlider();
  initCustomSelect('#sity');
  initCustomSelect('#feedback-sity');

  window.addEventListener('resize', throttledResize);
});
