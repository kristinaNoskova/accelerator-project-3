import Swiper from 'swiper';
import {Navigation, Pagination, A11y, Grid} from 'swiper/modules';
import 'swiper/css/grid';

const attachPaginationEvents = (swiper) => {
  const bullets = swiper.el.querySelectorAll('.news-swiper__bullet');
  bullets.forEach((bullet) => {
    bullet.addEventListener('click', (e) => {
      const pageIndex = parseInt(e.currentTarget.dataset.index, 10);
      const groupSize = swiper.params.slidesPerGroup || 1;
      const rows = swiper.params.grid.rows || 1;
      const groupSlides = groupSize * rows;

      const maxIndex = swiper.slides.length - 1;
      const targetIndex = Math.min(pageIndex * groupSlides, maxIndex);
      swiper.slideTo(targetIndex);
    });
  });
};

const initSwiper = (container) => {
  const newsSwiper = new Swiper(container, {
    modules: [Pagination, Navigation, A11y, Grid],
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 800,
    grid: {
      rows: 2,
      fill: 'column',
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 2,
          fill: 'column',
        },
      },
      768: {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1200: {
        spaceBetween: 32,
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        autoHeight: true,
        grid: {
          rows: 1,
          fill: 'row',
        },
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
        const groupSize = swiper.params.slidesPerGroup || 1;
        const rows = swiper.params.grid.rows || 1;
        const groupSlides = groupSize * rows;

        const totalSlides = swiper.slides.filter((slide) => !slide.classList.contains('swiper-slide-duplicate')).length;
        const totalPages = Math.ceil(totalSlides / groupSlides);
        const currentPage = Math.floor(swiper.activeIndex / groupSlides) + 1;

        const maxVisible = 4;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(start + maxVisible - 1, totalPages);
        if (end - start < maxVisible - 1) {
          start = Math.max(1, end - maxVisible + 1);
        }

        let output = '';
        for (let i = start; i <= end; i++) {
          const isActive = i === currentPage ? 'news-swiper__bullet--active' : '';
          output += `<button class="news-swiper__bullet ${isActive} button" data-index="${i - 1}">${i}</button>`;
        }

        return output;
      }
    },

    on: {
      init() {
        this.pagination.render();
        attachPaginationEvents(this);
      },
      slideChange() {
        this.pagination.render();
        attachPaginationEvents(this);
      },
      resize() {
      },
    }
  });
  return newsSwiper;
};

document.querySelectorAll('.news-swiper').forEach((swiperContainer) => {
  initSwiper(swiperContainer);
});

export {initSwiper};
