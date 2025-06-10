const menuElement = document.querySelector('.main-nav');
const menuItemElements = document.querySelectorAll('.main-nav__menu-item');
const bodyElement = document.querySelector('.page-body');
const burgerButtonElement = menuElement.querySelector('.main-nav__button');

const isMenuToggle = (method) => {
  menuElement.classList[method]('main-nav--open');
  bodyElement.classList[method]('page-body--overlay');
};

const initMobileMenu = () => {
  burgerButtonElement.addEventListener('click', () => {
    isMenuToggle('toggle');
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
    const itemSubmenu = item.querySelector('.main-nav__submenu');

    if(item.classList.contains('has-submenu')) {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();

        item.classList.toggle('has-submenu--visible');

        if(item.classList.contains('has-submenu--visible')) {
          itemSubmenu.style.maxHeight = `${itemSubmenu.scrollHeight}px`;
        } else {
          itemSubmenu.style.maxHeight = null;
        }
      });
    }
  });
};

const closeMenuOnOutsideClick = () => {
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = menuElement.contains(event.target);
    const isClickOnToggle = burgerButtonElement.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      isMenuToggle('remove');
    }
  });
};


export {initMobileMenu, initSubmenu, closeMenuOnOutsideClick};
