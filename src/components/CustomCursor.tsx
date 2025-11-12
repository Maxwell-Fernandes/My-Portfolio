import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth magnetic effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Show cursor after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);

    const onMouseMove = (e: MouseEvent) => {
      // Get all magnetic elements
      const magneticElements = document.querySelectorAll<HTMLElement>('[data-magnetic="true"], a, button');
      let closestElement: HTMLElement | null = null;
      let closestDistance = Infinity;

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        // Calculate distance from cursor to element center
        const distance = Math.sqrt(
          Math.pow(e.clientX - elementCenterX, 2) + Math.pow(e.clientY - elementCenterY, 2)
        );

        // Magnetic effect radius
        const magneticRadius = Math.max(rect.width, rect.height) * 1.5;

        if (distance < magneticRadius && distance < closestDistance) {
          closestElement = element;
          closestDistance = distance;
        }
      });

      if (closestElement) {
        const rect = (closestElement as HTMLElement).getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        // Calculate pull strength
        const maxDistance = Math.max(rect.width, rect.height) * 1.5;
        const pullStrength = Math.max(0, 1 - closestDistance / maxDistance);

        // Apply magnetic pull
        const pullX = (elementCenterX - e.clientX) * pullStrength * 0.3;
        const pullY = (elementCenterY - e.clientY) * pullStrength * 0.3;

        cursorX.set(e.clientX + pullX);
        cursorY.set(e.clientY + pullY);
      } else {
        // No magnetic element nearby, follow mouse normally
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;

      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.add('scale-150');
        ringRef.current.classList.add('scale-150');
      }

      // Add magnetic attribute if not present
      if (!target.hasAttribute('data-magnetic')) {
        target.setAttribute('data-magnetic', 'true');
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.remove('scale-150');
        ringRef.current.classList.remove('scale-150');
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add listeners to existing elements
    const addListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, input, textarea, [data-magnetic="true"]');
      hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);
      });
      return hoverElements;
    };

    let hoverElements = addListeners();

    // Re-attach listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
      hoverElements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={ringRef}
        className="fixed w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-200"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
