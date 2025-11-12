import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);

    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current && ringRef.current) {
        // Update cursor positions using CSS transform
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseEnter = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.add('scale-150');
        ringRef.current.classList.add('scale-150');
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.remove('scale-150');
        ringRef.current.classList.remove('scale-150');
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
        style={{ left: '-100px', top: '-100px' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={ringRef}
        className="fixed w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
        style={{ left: '-100px', top: '-100px' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
