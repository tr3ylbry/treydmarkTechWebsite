"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  fadeUpVariants,
  reducedFadeVariants,
  reducedStaggerContainerVariants,
  reducedStaggerItemVariants,
  revealViewport,
  staggerContainerVariants,
  staggerItemVariants,
  subtleCtaHover,
} from "@/lib/motion";

type MotionRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function MotionReveal({
  delay = 0,
  children,
  ...props
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={
        prefersReducedMotion ? reducedFadeVariants(delay) : fadeUpVariants(delay)
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={
        prefersReducedMotion
          ? reducedStaggerContainerVariants
          : staggerContainerVariants
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  ...props
}: HTMLMotionProps<"article">) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={
        prefersReducedMotion ? reducedStaggerItemVariants : staggerItemVariants
      }
      {...props}
    >
      {children}
    </motion.article>
  );
}

export function MotionAnchor({
  children,
  ...props
}: HTMLMotionProps<"a">) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      whileHover={prefersReducedMotion ? undefined : subtleCtaHover}
      whileTap={prefersReducedMotion ? undefined : { y: -1 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
