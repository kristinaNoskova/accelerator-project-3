const initCloseKeydown = (cb, ...args) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      cb(...args);
    }
  });
};

export {initCloseKeydown};
