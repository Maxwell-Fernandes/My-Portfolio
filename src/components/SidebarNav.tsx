import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = ["hero", "about", "skills", "projects", "contact"];

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-6">
      {sections.map((section) => (
        <motion.button
          key={section}
          className={`w-4 h-4 rounded-full cursor-pointer transition ${
            activeSection === section ? "bg-cyan-400 scale-125" : "bg-gray-600"
          }`}
          whileHover={{ scale: 1.5 }}
          aria-label={`Scroll to ${section}`}
          onClick={() => {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      ))}
    </nav>
  );
};

export default SidebarNav;
