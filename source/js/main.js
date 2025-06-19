import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';


import { throttle, debounce } from './modules/throttle-debounce.js';
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

import {setupSlider} from'./modules/news-slider.js';
import { initAccordeon, onResize } from './modules/accordeon.js';
import {initValidation} from './modules/form-validate.js';
import {initModal} from './modules/modal.js';

const throttledResize = throttle(onResize, 200);
const debounceResize = debounce(setupSlider, 200);

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
  initValidation();
  initModal();
  setupSlider();

  window.addEventListener('resize', () => {
    debounceResize();
    throttledResize();
  });
});
