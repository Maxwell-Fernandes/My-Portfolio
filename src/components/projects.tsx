import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { memo } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Quickart",
    description: "A modern grocery delivery application built with Flutter and Firebase. Features include real-time order tracking, user authentication, product management, and a seamless shopping experience with cloud storage integration.",
    image: "/projects/quickart.jpg",
    tags: ["Flutter", "Firebase", "Dart", "Cloud Firestore", "State Management", "Real-time Database"],
    github: "https://github.com/Maxwell-Fernandes/Quickart",
  },
  {
    title: "Quickart Admin",
    description: "Admin dashboard application for Quickart built with Dart. Manage inventory, track orders, and handle user management with an intuitive interface.",
    // TODO: Add project screenshot at /public/projects/quickart-admin.png
    image: "/projects/quickart-admin.png",
    tags: ["Dart", "Flutter", "Firebase", "State Management"],
    github: "https://github.com/Maxwell-Fernandes/Quickart-Admin",
  },
  {
    title: "Download Accelerator",
    description: "A multi-threaded download accelerator written in Java that speeds up file downloads by splitting them into multiple chunks. Features include pause/resume functionality, graceful shutdown, and encrypted metadata storage.",
    // TODO: Add project screenshot at /public/projects/download-accelerator.png
    image: "/projects/download-accelerator.png",
    tags: ["Java", "Multi-threading", "File Handling", "Encryption", "Network Programming"],
    github: "https://github.com/Maxwell-Fernandes/Download-Accelerator",
  },
  {
    title: "Toralizer",
    description: "A Linux command-line proxy server implemented in advanced C. Provides secure and efficient network routing capabilities with low-level system programming concepts.",
    // TODO: Add project screenshot at /public/projects/toralizer.png
    image: "/projects/toralizer.png",
    tags: ["C", "Linux", "Networking", "System Programming", "Proxy Server"],
    github: "https://github.com/Maxwell-Fernandes/Toralizer",
  },
  {
    title: "Road Pothole Detection",
    description: "An innovative system that uses computer vision and deep learning to detect and analyze road potholes in real-time. Built with Python and advanced ML frameworks to improve road safety and maintenance.",
    // TODO: Add project screenshot at /public/projects/pothole.png
    image: "/projects/pothole.png",
    tags: ["Python", "Computer Vision", "Deep Learning", "OpenCV", "Machine Learning"],
    github: "https://github.com/Maxwell-Fernandes/RoadPotholeDetection",
  }
];

const Projects: React.FC = memo(() => {
  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-cyan-400 mb-16"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-12 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm`}
            >
              {/* Project Image */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-cyan-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                  >
                    <FiGithub className="text-xl" />
                    <span>Source Code</span>
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                    >
                      <FiExternalLink className="text-xl" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://github.com/Maxwell-Fernandes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xl font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View More Projects on GitHub</span>
            <motion.div
              className="group-hover:translate-x-1 transition-transform"
              whileHover={{ scale: 1.1 }}
            >
              <FiArrowRight className="text-2xl" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
