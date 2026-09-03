export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};

export const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } },
};

export const sidebarItem = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const modalPanel = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
};
