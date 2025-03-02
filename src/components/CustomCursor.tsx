import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
        style={{ left: '-100px', top: '-100px' }}
      />
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-150"
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  );
};

export default CustomCursor; 