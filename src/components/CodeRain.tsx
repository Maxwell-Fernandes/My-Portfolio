import { useEffect, useRef, memo } from 'react';

/**
 * CodeRain - Matrix-style falling code background effect
 * Features tech stack terms falling down the screen with varying speeds
 */
const CodeRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tech stack characters to display
    const techStack = [
      'React',
      'TypeScript',
      'JavaScript',
      'Java',
      'Python',
      'C++',
      'Flutter',
      'Dart',
      'Firebase',
      'MongoDB',
      'MySQL',
      'Git',
      'Docker',
      'HTML',
      'CSS',
      'Node',
      'Redux',
      'API',
      'REST',
      'GraphQL',
      '{',
      '}',
      '[',
      ']',
      '(',
      ')',
      '<',
      '>',
      '/',
      '\\',
      '0',
      '1',
    ];

    // Column properties
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);
    const speeds: number[] = Array(columns)
      .fill(0)
      .map(() => 0.3 + Math.random() * 0.7); // Random speeds

    // Animation function
    let animationFrameId: number;
    const draw = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random tech term
        const text = techStack[Math.floor(Math.random() * techStack.length)];

        // Color gradient based on position
        const y = drops[i] * fontSize;
        const alpha = 1 - y / canvas.height;

        // Cyan color with varying opacity
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.8})`;
        ctx.fillText(text, i * fontSize, y);

        // Reset drop to top when it reaches bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += speeds[i];
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
});

CodeRain.displayName = 'CodeRain';

export default CodeRain;
