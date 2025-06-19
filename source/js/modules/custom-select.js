import SlimSelect from '../vendor/slimselect.js';

const initCustomSelect = (selector) => {
  new SlimSelect({
    select: selector,

    settings: {
      openPosition: 'down',
      showSearch: false,
      allowDeselect: false,
      placeholderText: ''
    },
    events: {
      afterChange: () => {
        const selectEl = document.querySelector(selector);
        selectEl.setCustomValidity(' ');
        selectEl.parentElement.classList.remove('contact-form__input-wrap--error');
      }
    }
  });
};

export {initCustomSelect};
