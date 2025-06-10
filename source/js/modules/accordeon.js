const accordionElement = document.querySelector('.accordeon');

const setMaxHeight = (content) => {
  if (content.classList.contains('accordeon__descr--visible')) {
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
};

const toggleAccordeon = (button, content) => {
  const isOpen = content.classList.toggle('accordeon__descr--visible');
  button.parentElement.classList.toggle('accordeon__item--active');

  if (isOpen) {
    setMaxHeight(content);
  } else {
    content.style.maxHeight = '0';
  }
};

const observeContentChanges = (content) => {
  const observer = new MutationObserver(() => {
    setMaxHeight(content);
  });

  observer.observe(content, { childList: true, subtree: true, characterData: true });
};

const initAccordeon = () => {
  const buttons = accordionElement.querySelectorAll('.accordeon__button');

  buttons.forEach((button) => {
    const content = button.parentElement.querySelector('.accordeon__descr');

    button.addEventListener('click', () => {
      toggleAccordeon(button, content);
    });

    setMaxHeight(content);

    observeContentChanges(content);
  });
};

const onResize = () => {
  document.querySelectorAll('.accordeon__descr--visible').forEach((element) => setMaxHeight(element));
};

export { initAccordeon, onResize };
