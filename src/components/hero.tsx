import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroProps {
  name: string;
}

const Hero: React.FC<HeroProps> = () => {
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
  }, [text]);

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-screen text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="min-h-[60px]"
      >
        <h1 className="text-5xl font-bold">
          <span className="text-white">Hey! I am </span>
          <span className="text-cyan-400">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
      </motion.div>
      <p className="text-xl mt-4 text-gray-300">
        Computer Engineering Student & Software Developer
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <motion.button
          onClick={handleViewWork}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glow-button"
        >
          View My Work
        </motion.button>
        <motion.a
          href="/assets/resume/resume.pdf"
          download="Maxwell_Resume.pdf"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-block bg-cyan-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-cyan-400 transition"
        >
          📄 Download Resume
        </motion.a>
      </div>
    </motion.section>
  );
};

export default Hero;
