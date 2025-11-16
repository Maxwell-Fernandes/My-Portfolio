import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiTerminal,
  FiX,
} from 'react-icons/fi';

interface Command {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

/**
 * CommandPalette - Quick navigation and actions via keyboard (⌘K / Ctrl+K)
 * Professional command palette inspired by VS Code, GitHub, etc.
 */
const CommandPalette = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define all available commands
  const commands: Command[] = useMemo(
    () => [
      {
        id: 'home',
        title: 'Go to Home',
        description: 'Navigate to the hero section',
        icon: <FiHome />,
        action: () => {
          document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['home', 'hero', 'top', 'start'],
      },
      {
        id: 'about',
        title: 'Go to About',
        description: 'Learn more about me',
        icon: <FiUser />,
        action: () => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['about', 'bio', 'profile', 'info'],
      },
      {
        id: 'skills',
        title: 'Go to Skills',
        description: 'View my technical skills',
        icon: <FiCode />,
        action: () => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['skills', 'tech', 'technologies', 'stack'],
      },
      {
        id: 'projects',
        title: 'Go to Projects',
        description: 'See my featured projects',
        icon: <FiFolder />,
        action: () => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['projects', 'work', 'portfolio', 'github'],
      },
      {
        id: 'contact',
        title: 'Go to Contact',
        description: 'Get in touch with me',
        icon: <FiMail />,
        action: () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['contact', 'email', 'message', 'reach'],
      },
      {
        id: 'terminal',
        title: 'Open Terminal',
        description: 'Interactive terminal',
        icon: <FiTerminal />,
        action: () => {
          // Terminal button click simulation
          const terminalBtn = document.querySelector('[data-terminal-toggle]') as HTMLElement;
          if (terminalBtn) terminalBtn.click();
          setIsOpen(false);
        },
        keywords: ['terminal', 'console', 'cli', 'shell'],
      },
      {
        id: 'github',
        title: 'Open GitHub',
        description: 'View my GitHub profile',
        icon: <FiGithub />,
        action: () => {
          window.open('https://github.com/Maxwell-Fernandes/Maxwell-Fernandes', '_blank');
          setIsOpen(false);
        },
        keywords: ['github', 'code', 'repos', 'repositories'],
      },
      {
        id: 'linkedin',
        title: 'Open LinkedIn',
        description: 'Connect on LinkedIn',
        icon: <FiLinkedin />,
        action: () => {
          window.open('https://www.linkedin.com/in/maxwell-fernandes-a37007270/', '_blank');
          setIsOpen(false);
        },
        keywords: ['linkedin', 'profile', 'connect', 'network'],
      },
      {
        id: 'resume',
        title: 'Download Resume',
        description: 'Download my resume PDF',
        icon: <FiDownload />,
        action: () => {
          const link = document.createElement('a');
          link.href = '/assets/resume/resume.pdf';
          link.download = 'Maxwell_Resume.pdf';
          link.click();
          setIsOpen(false);
        },
        keywords: ['resume', 'cv', 'download', 'pdf'],
      },
    ],
    []
  );

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands;

    const searchLower = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(searchLower) ||
        cmd.description.toLowerCase().includes(searchLower) ||
        cmd.keywords.some((keyword) => keyword.includes(searchLower))
    );
  }, [search, commands]);

  // Reset selection when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open/Close with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
        return;
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
        return;
      }

      // Navigate with arrow keys
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Handle command selection
  const handleCommandClick = useCallback((command: Command) => {
    command.action();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-gray-900 rounded-xl border border-[var(--primary)]/30 shadow-2xl z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
              <FiSearch className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {filteredCommands.length > 0 ? (
                <div className="p-2">
                  {filteredCommands.map((command, index) => (
                    <motion.button
                      key={command.id}
                      onClick={() => handleCommandClick(command)}
                      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors text-left ${
                        index === selectedIndex
                          ? 'bg-[var(--primary)]/20 border border-[var(--primary)]/50'
                          : 'hover:bg-gray-800 border border-transparent'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div
                        className={`text-2xl ${
                          index === selectedIndex ? 'text-[var(--primary)]' : 'text-gray-400'
                        }`}
                      >
                        {command.icon}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-semibold ${
                            index === selectedIndex ? 'text-[var(--primary)]' : 'text-white'
                          }`}
                        >
                          {command.title}
                        </div>
                        <div className="text-sm text-gray-400">{command.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No commands found for "{search}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-gray-800 text-xs text-gray-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-gray-800 rounded">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-gray-800 rounded">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
