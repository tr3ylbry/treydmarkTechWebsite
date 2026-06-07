export const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const revealViewport = {
  once: true,
  amount: 0.24,
} as const;

export function fadeUpVariants(delay = 0) {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.72,
        ease: cinematicEase,
        delay,
      },
    },
  };
}

export function reducedFadeVariants(delay = 0) {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.22,
        ease: cinematicEase,
        delay: Math.min(delay, 0.05),
      },
    },
  };
}

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const reducedStaggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.64,
      ease: cinematicEase,
    },
  },
};

export const reducedStaggerItemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: cinematicEase,
    },
  },
};

export const subtleCtaHover = {
  y: -2,
  boxShadow:
    "0 14px 34px rgba(0, 0, 0, 0.24), 0 0 28px rgba(230, 184, 162, 0.14)",
  transition: {
    duration: 0.2,
    ease: cinematicEase,
  },
};
