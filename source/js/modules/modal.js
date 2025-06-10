const btnOpen = document.querySelector('.about__link');
const btnClose = document.querySelector('.modal__button--close');
const modal = document.querySelector('.modal');
const modalWindow = modal.querySelector('.modal__wrapper');

const animateIn = () => {
  modalWindow.classList.remove('modal__wrapper--in');
  modalWindow.removeEventListener('animationend', animateIn);
};

const modalOpenHandler = (evt) => {
  evt.preventDefault();
  modalWindow.addEventListener('animationend', animateIn);
  modal.classList.add('modal--open');
  modalWindow.classList.add('modal__wrapper--in');
  document.body.style.setProperty('overflow', 'hidden');
};

const animateOut = () => {
  modal.classList.remove('modal--open');
  modalWindow.classList.remove('modal__wrapper--out');
  modalWindow.removeEventListener('animationend', animateOut);

};

const modalCloseHandler = () => {
  modalWindow.addEventListener('animationend', animateOut);
  modalWindow.classList.add('modal__wrapper--out');
  document.body.style.setProperty('overflow', 'visible');
};

const overlayClickHandler = (evt) => {
  if (evt.target === modal) {
    modalCloseHandler();
  }
};

btnOpen.addEventListener('click', modalOpenHandler);
btnClose.addEventListener('click', modalCloseHandler);
modal.addEventListener('click', overlayClickHandler);

export {};
