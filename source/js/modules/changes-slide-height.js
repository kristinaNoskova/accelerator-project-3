const equalizeSlideHeights = (swiperSelector) => {
  const slides = document.querySelectorAll(`${swiperSelector} .swiper-slide`);
  const wrapper = document.querySelector(`${swiperSelector} .swiper-wrapper`);
  slides.forEach((slide) => {
    slide.style.height = 'auto';
  });

  wrapper.style.height = 'auto';

  let maxHeight = 0;

  slides.forEach((slide) => {
    slide.style.height = 'auto';
    maxHeight = Math.max(maxHeight, slide.offsetHeight);
  });

  slides.forEach((slide) => {
    slide.style.height = `${maxHeight}px`;
  });
};


const observeSlideChanges = (swiperSelector) => {
  const swiper = document.querySelector(swiperSelector);
  const wrapper = swiper.querySelector('.swiper-wrapper');

  if (!wrapper) {
    return;
  }

  const observer = new MutationObserver(() => {
    equalizeSlideHeights(swiperSelector);
  });

  observer.observe(wrapper, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return observer;
};

export {
  equalizeSlideHeights,
  observeSlideChanges,
};
