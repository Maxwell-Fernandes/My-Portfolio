import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const StarsBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Make it cover the whole screen
        particles: {
          number: { value: 100, density: { enable: true, area: 800 } },
          shape: { type: "circle" },
          opacity: { value: 0.8, random: true },
          size: { value: { min: 1, max: 3 }, random: true },
          move: { enable: true, speed: 0.3 },
          color: { value: "#ffffff" }, // White stars
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        background: { color: "#000000" }, // Keep the space theme
      }}
    />
  );
};

export default StarsBackground;
