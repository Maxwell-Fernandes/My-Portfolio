import { motion } from "framer-motion";
import { memo } from "react";

const About: React.FC = memo(() => {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-[var(--primary)] text-center mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-[var(--primary)]">
              Computer Engineering Student & Software Developer
            </h3>
            
            <p className="text-[var(--light-grey)] leading-relaxed">
            I am a passionate Computer Engineering student with a strong focus on developing efficient software solutions.
             My expertise lies in web and mobile development, where I utilize languages such as Java, Python, and JavaScript to create scalable applications that address complex challenges. Proficient in ReactJS for building dynamic user interfaces and Flutter with Dart for crafting cross-platform mobile applications, I am dedicated to delivering high-quality code and innovative solutions that enhance user experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <h4 className="text-[var(--primary)] font-semibold">Location</h4>
                <p className="text-[var(--light-grey)]">Goa, India</p>
              </div>
              <div>
                <h4 className="text-[var(--primary)] font-semibold">LinkedIn</h4>
                <p className="text-[var(--light-grey)]">maxwell-fernandes-a37007270</p>
              </div>
              <div>
                <h4 className="text-[var(--primary)] font-semibold">Tech Stack</h4>
                <p className="text-[var(--light-grey)]">React, Java, Python, JavaScript</p>
              </div>
              <div>
                <h4 className="text-[var(--primary)] font-semibold">Interests</h4>
                <p className="text-[var(--light-grey)]">System Design, Machine Learning</p>
              </div>
            </div>

            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-semibold
                         hover:bg-[var(--hover-primary)] transition-all [var(--transition-base)] shadow-lg
                         hover:shadow-[var(--primary)]/50"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Right side - Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full h-[400px] relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-[var(--primary)]/10 rounded-lg transform rotate-6"></div>
              <div className="absolute inset-0 bg-[var(--primary)]/20 rounded-lg transform -rotate-6"></div>
              
              {/* Avatar container */}
              <div className="relative bg-gradient-to-b from-[var(--primary)]/20 to-transparent
                            rounded-lg overflow-hidden w-full h-full flex items-center justify-center">
                <img
                  src="/images/profile.jpg" // Replace with your avatar/photo path
                  alt="Profile Avatar"
                  className="w-64 h-64 rounded-full border-4 border-[var(--primary)]/50 shadow-xl"
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-[var(--primary)] text-white px-4 py-2 rounded-full"
            >
              Software Developer
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-[var(--primary)] text-white px-4 py-2 rounded-full"
            >
              Tech Enthusiast
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
