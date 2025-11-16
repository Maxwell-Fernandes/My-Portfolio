import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { memo } from 'react';

/**
 * ScrollDownIndicator - Animated indicator showing there's more content below
 * Bounces to attract attention, fades out after scrolling
 */
const ScrollDownIndicator = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-[var(--primary)] text-3xl"
        >
          <FiChevronDown />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ScrollDownIndicator.displayName = 'ScrollDownIndicator';

export default ScrollDownIndicator;
