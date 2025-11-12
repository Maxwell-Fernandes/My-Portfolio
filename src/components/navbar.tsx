import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 text-white shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <a href="#" className="text-2xl font-bold font-mono">
          <span className="text-cyan-400">M</span>
          <span className="text-white">axwell </span>
          <span className="text-cyan-400">F</span>
          <span className="text-white">ernandes</span>
        </a>

        <motion.button
          className="md:hidden text-white focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? "✖" : "☰"}
        </motion.button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["about", "skills", "projects", "contact"].map((section, i) => (
            <motion.li
              key={section}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.6 }}
            >
              <motion.a
                href={`#${section}`}
                className={`hover:text-cyan-400 transition-colors ${
                  activeSection === section ? "text-cyan-400" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center space-y-4 py-6 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {["about", "skills", "projects", "contact"].map((section, i) => (
                <motion.li
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.a
                    href={`#${section}`}
                    className={`text-lg hover:text-cyan-400 transition-colors ${
                      activeSection === section ? "text-cyan-400" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
