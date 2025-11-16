import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const SocialLinks = () => {
  const links = [
    { icon: <FiGithub />, url: 'https://github.com/Maxwell-Fernandes' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/maxwell-fernandes-a37007270/' },
    { icon: <FiTwitter />, url: 'https://x.com/Maxwell65794986' },
    { icon: <FiMail />, url: 'mailto:fernandesmax082@gmail.com' },
  ];

  return (
    <motion.div
      className="fixed left-8 bottom-0 z-30 hidden lg:flex flex-col gap-6 items-center after:content-[''] after:w-[1px] after:h-32 after:bg-[var(--hover-primary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {links.map((link, i) => (
        <motion.a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-400 hover:text-[var(--primary)] hover:-translate-y-1 transition-all duration-200"
          whileHover={{ scale: 1.2 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 + 1 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks; 