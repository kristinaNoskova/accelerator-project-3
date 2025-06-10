import Swiper from 'swiper';

const createSwiperIfExists = (selector, config) => {
  const el = document.querySelector(selector);
  if (!el) {
    return null;
  }
  return new Swiper(el, config);
};

export {createSwiperIfExists};
