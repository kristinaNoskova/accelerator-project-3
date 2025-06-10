import {createSwiperIfExists} from './utils';
import {Navigation, Pagination, A11y, Scrollbar} from 'swiper/modules';
import {equalizeSlideHeights, observeSlideChanges} from './changes-slide-height.js';

const movePagination = (swiper) => {
  const paginationEl = document.querySelector('.hero-swiper__pagination');
  if (!paginationEl) {
    return;
  }

  const activeIndex = swiper.realIndex;

  const allSlides = document.querySelectorAll('.hero-swiper__slide');

  const targetSlide = Array.from(allSlides).find((slide) => +slide.getAttribute('data-swiper-slide-index') === activeIndex);

  if (targetSlide) {
    const contentBlock = targetSlide.querySelector('.hero-content__pagination');
    if (contentBlock && !contentBlock.contains(paginationEl)) {
      contentBlock.append(paginationEl);
    }
  }
};

const initHeroSlider = () => {
  createSwiperIfExists('.hero-swiper', {
    loop: true,
    speed: 800,
    slidesPerView: 1,
    modules: [Pagination, Navigation, A11y],
    watchSlidesVisibility: true,
    simulateTouch: true,
    touchRatio: 1.5,
    threshold: 10,
    autoHeight: true,
    breakpoints: {
      1200: {
        allowTouchMove: false,
      }
    },
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
    pagination: {
      el: '.hero-swiper__pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'hero-swiper__pagination-bullet',
      bulletActiveClass: 'hero-swiper__pagination-bullet--active',
      bulletElement: 'button',
    },
    resizeObserver: false,
    observer: true,
    on: {
      init: function (swiper) {
        movePagination(swiper);
        observeSlideChanges('.hero-swiper');
      },
      slideChange: function (swiper) {
        movePagination(swiper);
      }
    }
  });
};


const initSliders = (swiperSelector, buttonNext, buttonPrev, scrollbar, countSlides) => {

  createSwiperIfExists(swiperSelector, {
    loop: false,
    speed: 800,
    modules: [Navigation, Scrollbar],
    watchSlidesVisibility: true,
    simulateTouch: true,
    touchRatio: 1.5,
    threshold: 10,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 20,
    breakpoints: {
      768: { spaceBetween: 30 },
      1200: { slidesPerView: countSlides, spaceBetween: 32 },
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    scrollbar: {
      el: scrollbar,
      draggable: true,
      dragSize: 'auto',
    },

    observer: true,
    observeParents: true,
    on: {
      init: function () {
        equalizeSlideHeights(swiperSelector);
        observeSlideChanges(swiperSelector);
      },
      resize: function () {
        equalizeSlideHeights(swiperSelector);
      }
    }
  });
};


const initProgramsSlider = () => {
  initSliders('.programs-swiper',
    '.programs-slider__button--next',
    '.programs-slider__button--prev',
    '.programs__slider-scrollbar',
    3
  );
};

const initReviewsSlider = () => {
  initSliders('.reviews-swiper',
    '.reviews-slider__button--next',
    '.reviews-slider__button--prev',
    '.reviews__slider-scrollbar',
    2
  );
};

export {
  initHeroSlider,
  initProgramsSlider,
  initReviewsSlider
};
