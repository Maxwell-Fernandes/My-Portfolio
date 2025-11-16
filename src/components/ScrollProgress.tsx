import { motion, useScroll, useSpring } from 'framer-motion';
import { memo } from 'react';

/**
 * ScrollProgress - Shows reading progress as user scrolls down the page
 * Displays as a cyan bar at the top of the viewport
 */
const ScrollProgress = memo(() => {
  // Track scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  // Apply spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary)] origin-left z-50"
      style={{ scaleX }}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress;
