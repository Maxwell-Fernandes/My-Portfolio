import { useRef, ReactNode, memo } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number; // 0-1, how strong the magnetic effect is
}

/**
 * MagneticWrapper - Wraps elements to make them attract the cursor
 *
 * Usage:
 * <MagneticWrapper strength={0.5}>
 *   <button>Click me</button>
 * </MagneticWrapper>
 */
const MagneticWrapper: React.FC<MagneticWrapperProps> = memo(({
  children,
  className = '',
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Spring values for smooth animation
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic pull with strength multiplier
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      data-magnetic="true"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
});

MagneticWrapper.displayName = 'MagneticWrapper';

export default MagneticWrapper;
