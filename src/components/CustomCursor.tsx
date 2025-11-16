import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Cache for magnetic elements to avoid repeated queries
  const magneticElementsCache = useRef<HTMLElement[]>([]);
  const rafId = useRef<number | undefined>(undefined);

  // Motion values for smooth magnetic effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth movement (optimized config)
  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Update magnetic elements cache
  const updateMagneticElementsCache = useCallback(() => {
    magneticElementsCache.current = Array.from(
      document.querySelectorAll<HTMLElement>('[data-magnetic="true"], a, button')
    );
  }, []);

  useEffect(() => {
    // Show cursor after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);

    // Initialize cache
    updateMagneticElementsCache();

    // Throttle mouse move for better performance
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // Throttle to ~60fps
      if (now - lastUpdate < throttleDelay) {
        return;
      }
      lastUpdate = now;

      // Use RAF for smooth updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let closestElement: HTMLElement | null = null;
        let closestDistance = Infinity;

        // Iterate through cached elements
        for (const element of magneticElementsCache.current) {
          // Quick visibility check to skip hidden elements
          if (element.offsetParent === null) continue;

          const rect = element.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;

          // Calculate distance (optimized: avoid sqrt until necessary)
          const dx = mouseX - elementCenterX;
          const dy = mouseY - elementCenterY;
          const distanceSquared = dx * dx + dy * dy;

          // Magnetic effect radius squared (avoid sqrt)
          const magneticRadius = Math.max(rect.width, rect.height) * 1.5;
          const magneticRadiusSquared = magneticRadius * magneticRadius;

          if (distanceSquared < magneticRadiusSquared && distanceSquared < closestDistance * closestDistance) {
            closestElement = element;
            closestDistance = Math.sqrt(distanceSquared);
          }
        }

        if (closestElement) {
          const rect = closestElement.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;

          // Calculate pull strength
          const maxDistance = Math.max(rect.width, rect.height) * 1.5;
          const pullStrength = Math.max(0, 1 - closestDistance / maxDistance);

          // Apply magnetic pull
          const pullX = (elementCenterX - mouseX) * pullStrength * 0.3;
          const pullY = (elementCenterY - mouseY) * pullStrength * 0.3;

          cursorX.set(mouseX + pullX);
          cursorY.set(mouseY + pullY);
        } else {
          // No magnetic element nearby, follow mouse normally
          cursorX.set(mouseX);
          cursorY.set(mouseY);
        }
      });
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
        updateMagneticElementsCache(); // Update cache when new element gets magnetic
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.remove('scale-150');
        ringRef.current.classList.remove('scale-150');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

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

    // Debounce observer to reduce frequency of updates
    let observerTimeout: number;
    const observer = new MutationObserver(() => {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        hoverElements.forEach((element) => {
          element.removeEventListener('mouseenter', onMouseEnter);
          element.removeEventListener('mouseleave', onMouseLeave);
        });
        hoverElements = addListeners();
        updateMagneticElementsCache();
      }, 100); // Debounce 100ms
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
      observer.disconnect();
      clearTimeout(observerTimeout);
    };
  }, [cursorX, cursorY, updateMagneticElementsCache]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed w-2 h-2 bg-[var(--primary)] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
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
        className="fixed w-8 h-8 border border-[var(--primary)] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-200"
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
