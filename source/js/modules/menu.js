import { initCloseKeydown} from './close-esc.js';
import { lockScroll, unlockScroll } from './scroll-lock.js';

const menuElement = document.querySelector('.main-nav');
const menuListElement = menuElement.querySelector('.main-nav__menu');
const menuItemElements = document.querySelectorAll('.main-nav__menu-item');
const bodyElement = document.querySelector('.page-body');
const burgerButtonElement = menuElement.querySelector('.main-nav__button');
const overlayElement = menuElement.querySelector('.main-nav__overlay');


const isMenuToggle = (method) => {
  menuElement.classList[method]('main-nav--open');
  bodyElement.classList[method]('page-body--overlay');
  if(menuElement.classList.contains('main-nav--open')) {
    lockScroll();
  } else {
    unlockScroll();
  }
};

initCloseKeydown(isMenuToggle, 'remove');

const initMobileMenu = () => {
  burgerButtonElement.addEventListener('click', () => {
    isMenuToggle('toggle');

    const isOpen = menuElement.classList.contains('main-nav--open');
    if (isOpen) {
      menuListElement.removeAttribute('inert');
      menuListElement.removeAttribute('aria-hidden');
    } else {
      menuListElement.setAttribute('inert', '');
      menuListElement.setAttribute('aria-hidden', 'true');
    }
  });

  menuElement.addEventListener('click', (event) => {
    const link = event.target.closest('.nav-link');

    if (link && !link.parentElement.classList.contains('has-submenu')) {
      isMenuToggle('remove');
    }
  });
};

const initSubmenu = () => {
  menuItemElements.forEach((item) => {
    if (item.classList.contains('has-submenu')) {
      const toggleLink = item.querySelector('.main-nav__menu-link');
      const submenu = item.querySelector('.main-nav__submenu');

      toggleLink.addEventListener('click', (evt) => {
        evt.preventDefault();

        const isOpen = item.classList.toggle('has-submenu--visible');
        submenu.style.maxHeight = isOpen ? `${submenu.scrollHeight}px` : null;
      });
    }
  });
};

const closeMenuOnOutsideClick = () => {
  overlayElement.addEventListener('click', () => {
    isMenuToggle('remove');
  });
};


export {initMobileMenu, initSubmenu, closeMenuOnOutsideClick};
