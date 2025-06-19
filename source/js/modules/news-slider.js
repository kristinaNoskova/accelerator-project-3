import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules';
import {updateTabIndex} from './swiper.js';

const attachPaginationEvents = (swiper) => {
  const bullets = swiper.el.querySelectorAll('.news-swiper__bullet');
  bullets.forEach((bullet) => {
    bullet.addEventListener('click', (e) => {
      const groupIndex = parseInt(e.currentTarget.dataset.index, 10);
      const groupSize = swiper.params.slidesPerGroup || 1;
      const targetIndex = groupIndex * groupSize;
      swiper.slideTo(targetIndex);
    });
  });
};

const originalSlidesMap = new WeakMap();

const saveOriginalSlides = (container) => {
  if (!originalSlidesMap.has(container)) {
    const wrapper = container.querySelector('.swiper-wrapper');

    const originalSlides = Array.from(wrapper.children).map(
      (slide) => slide.innerHTML
    );

    originalSlidesMap.set(container, originalSlides);
  }
};

const createGroupedSlides = (container, groupSize) => {
  const wrapper = container.querySelector('.swiper-wrapper');
  const originalSlides = originalSlidesMap.get(container);
  if (!originalSlides) {
    return;
  }

  wrapper.innerHTML = '';

  for (let i = 0; i < originalSlides.length; i += groupSize) {
    const groupContent = originalSlides
      .slice(i, i + groupSize)
      .map((html) => `<div class="news-item__content">${html}</div>`)
      .join('');

    const newSlide = document.createElement('div');
    newSlide.classList.add('swiper-slide');
    newSlide.classList.add('news-swiper__slide');
    newSlide.innerHTML = groupContent;
    wrapper.appendChild(newSlide);
  }
};

let swiperInstance = null;

const initSwiper = (container) => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper(container, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        spaceBetween: 30,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1200: {
        spaceBetween: 32,
        slidesPerView: 'auto',
        slidesPerGroup: 3,
      },
    },
    navigation: {
      nextEl: container.querySelector('.swiper-button-next'),
      prevEl: container.querySelector('.swiper-button-prev'),
    },
    pagination: {
      el: container.querySelector('.swiper-pagination'),
      clickable: true,
      type: 'custom',
      renderCustom: function (swiper) {
        const totalSlides = swiper.slides.length;
        const groupSize = swiper.params.slidesPerGroup || 1;
        const totalGroups = Math.ceil(totalSlides / groupSize);
        const currentGroup = Math.floor(swiper.realIndex / groupSize);

        const maxVisible = 4;
        let start = Math.max(0, currentGroup - Math.floor(maxVisible / 2));

        let end = start + maxVisible;

        if (end > totalGroups) {
          end = totalGroups;
          start = Math.max(0, end - maxVisible);
        }

        let output = '';
        for (let i = start; i < end; i++) {
          const isActive =
            i === currentGroup ? 'news-swiper__bullet--active' : '';
          output += `<button class="news-swiper__bullet ${isActive}" data-index="${i}">${
            i + 1
          }</button>`;
        }

        return output;
      },
    },

    on: {
      init() {
        this.pagination.render();
        attachPaginationEvents(this);
        updateTabIndex(this);
      },
      slideChange() {
        this.pagination.render();
        attachPaginationEvents(this);
        updateTabIndex(this);
      },
      transitionEnd: function () {
        updateTabIndex(this);
      },
    },
  });
};

const setupSlider = () => {
  const container = document.querySelector('.news-swiper');
  saveOriginalSlides(container);
  let groupSize = 1;
  const isMobile = window.innerWidth < 767;
  const isTablet = window.innerWidth < 1200;

  if (isMobile) {
    groupSize = 2;
  } else if (isTablet) {
    groupSize = 4;
  } else {
    groupSize = 1;
  }
  createGroupedSlides(container, groupSize);
  initSwiper(container);
};

export {setupSlider};
