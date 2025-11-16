import { motion } from "framer-motion";
import { memo } from "react";

const skills = [
  // Development
  { name: "Java", icon: "/icons/java.svg", level: "Proficient" },
  { name: "Python", icon: "/icons/python.svg", level: "Good" },
  { name: "C++", icon: "/icons/cpp.svg", level: "Very Good" },
  { name: "C", icon: "/icons/c.svg", level: "Very Good" },
  { name: "Dart", icon: "/icons/dart.svg", level: "Very Good" },
  { name: "JavaScript", icon: "/icons/javascript.svg", level: "Very Good" },
  { name: "TypeScript", icon: "/icons/typescript.svg", level: "Very Good" },

  // Databases
  { name: "MySQL", icon: "/icons/mysql.svg", level: "Proficient" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", level: "Good" },
  { name: "Graphql", icon: "/icons/graphql.svg", level: "Beginner" },
  { name: "Firebase", icon: "/icons/firebase.svg", level: "Good" },
  
  // Frontend
  { name: "HTML5", icon: "/icons/html.svg", level: "Proficient" },
  { name: "CSS3", icon: "/icons/css.svg", level: "Very Good" },
  { name: "React.js", icon: "/icons/react.svg", level: "Very Good" },

  // Tools & Others
  { name: "Flutter", icon: "/icons/flutter.svg", level: "Good" },
  { name: "Redux", icon: "/icons/redux.svg", level: "Very Good" },
  { name: "Bootstrap", icon: "/icons/bootstrap.svg", level: "Good" },
  { name: "Tailwind", icon: "/icons/tailwind.svg", level: "Very Good" },
  
  // DevOps & Tools
  { name: "Git", icon: "/icons/git.svg", level: "Proficient" },
  { name: "GitHub", icon: "/icons/github.svg", level: "Proficient" },
  { name: "Docker", icon: "/icons/docker.svg", level: "Good" },
  
  // Additional Tools
  { name: "VSCode", icon: "/icons/vscode.svg", level: "Proficient" },
  { name: "IntelliJ IDEA", icon: "/icons/intelij-idea.svg", level: "Proficient" },
  { name: "Bash", icon: "/icons/bash.svg", level: "Very Good" },
  { name: "Vim", icon: "/icons/vim.svg", level: "Very Good" },
];

const Skills: React.FC = memo(() => {
  return (
    <section id="skills" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-[var(--primary)] mb-16"
        >
          Technical Skills
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-[var(--light-grey)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm hover:border-[var(--primary)]/50 transition-all [var(--transition-base)]">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-12 h-12 mb-2"
                />
                <span className="text-[var(--light-grey)] text-sm">{skill.name}</span>
                
                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[var(--primary)] text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity [var(--transition-base)] whitespace-nowrap">
                  {skill.level}
                  {/* Triangle pointer */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--primary)] rotate-45"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills; 