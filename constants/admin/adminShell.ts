export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const SHELL_SIDEBAR_MOTION = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.38, ease: MOTION_EASE },
};

export const SHELL_HEADER_MOTION = {
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: MOTION_EASE, delay: 0.06 },
};
