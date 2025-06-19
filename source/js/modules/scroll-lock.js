let scrollLockCounter = 0;

function lockScroll() {
  scrollLockCounter++;

  if (scrollLockCounter === 1) {
    document.body.style.overflow = 'hidden';
  }
}

function unlockScroll() {
  scrollLockCounter = Math.max(0, scrollLockCounter - 1);

  if (scrollLockCounter === 0) {
    document.body.style.overflow = '';
  }
}

export { lockScroll, unlockScroll };
