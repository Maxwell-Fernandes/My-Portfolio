import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight, FiCode, FiStar, FiFolder } from "react-icons/fi";
import { memo, useRef, useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Quickart",
    description: "A modern grocery delivery application built with Flutter and Firebase. Features include real-time order tracking, user authentication, product management, and a seamless shopping experience with cloud storage integration.",
    image: "/projects/quickart.jpg",
    tags: ["Flutter", "Firebase", "Dart", "Cloud Firestore", "State Management", "Real-time Database"],
    github: "https://github.com/Maxwell-Fernandes/Quickart",
    featured: true,
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
    featured: true,
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

// 3D Tilt Card Component with glassmorphism
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20,
  });

  // Handle mouse move for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position (-0.5 to 0.5)
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Animated border glow */}
      <div className="absolute -inset-0.5 bg-[var(--primary)] rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

      {/* Card */}
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[var(--primary)] transition-all duration-300 shadow-lg">
        {/* Project Image with parallax */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="absolute top-4 left-4 z-20 bg-[var(--primary)] text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-1.5"
            >
              <FiStar className="text-sm" />
              Featured
            </motion.div>
          )}

          {/* Image with hover zoom */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.6s ease-out",
            }}
          />

          {/* Glowing effect on hover */}
          <motion.div
            className="absolute inset-0 bg-[var(--primary)]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 md:p-8" style={{ transform: "translateZ(50px)" }}>
          {/* Title with icon */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
              {project.title}
            </h3>
            <motion.div
              className="text-[var(--primary)] text-2xl"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <FiCode />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                viewport={{ once: true }}
                className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm border border-[var(--primary)]/30 hover:bg-[var(--primary)]/20 hover:border-[var(--primary)] transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-[var(--primary)] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-[var(--primary)]"
            >
              <FiGithub className="text-lg" />
              <span>View Code</span>
            </motion.a>

            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--hover-primary)] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FiExternalLink className="text-lg" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects: React.FC = memo(() => {
  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[var(--primary)] mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg">
            A showcase of my best work in software development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/Maxwell-Fernandes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--hover-primary)] text-white rounded-lg font-semibold shadow-md transition-all duration-300"
          >
            <FiFolder className="text-lg" />
            <span>View More Projects on GitHub</span>
            <FiArrowRight className="text-lg" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
