import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import MagneticWrapper from "./MagneticWrapper";
import ScrollDownIndicator from "./ScrollDownIndicator";
import { FiDownload } from "react-icons/fi";

const Hero: React.FC = memo(() => {
  const [text, setText] = useState("");
  const fullText = "Maxwell Fernandes";

  useEffect(() => {
    // Start typing the name
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[text.length]);
      }, 100); // Adjust typing speed here (milliseconds)

      return () => clearTimeout(timeout);
    }
  }, [text, fullText]);

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center h-screen text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="min-h-[60px]"
      >
        <h1 className="text-5xl font-bold">
          <span className="text-white">Hey! I am </span>
          <span className="text-[var(--primary)]">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
      </motion.div>
      <p className="text-xl mt-4 text-gray-300">
        Computer Engineering Student & Software Developer
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <MagneticWrapper strength={0.4}>
          <motion.button
            onClick={handleViewWork}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glow-button"
          >
            View My Work
          </motion.button>
        </MagneticWrapper>
        <MagneticWrapper strength={0.4}>
          <motion.a
            href="/assets/resume/resume.pdf"
            download="Maxwell_Resume.pdf"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-[var(--hover-primary)] transition"
          >
            <FiDownload />
            Download Resume
          </motion.a>
        </MagneticWrapper>
      </div>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator />
    </motion.section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
