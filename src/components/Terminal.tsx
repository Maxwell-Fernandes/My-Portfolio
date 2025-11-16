import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

const Terminal: React.FC = memo(() => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands: Record<string, () => string | React.ReactNode> = {
    help: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">Available Commands:</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-green-400">help</span> - Show available commands</div>
          <div><span className="text-green-400">about</span> - About Maxwell</div>
          <div><span className="text-green-400">skills</span> - List technical skills</div>
          <div><span className="text-green-400">projects</span> - View projects</div>
          <div><span className="text-green-400">contact</span> - Contact information</div>
          <div><span className="text-green-400">education</span> - Educational background</div>
          <div><span className="text-green-400">clear</span> - Clear terminal</div>
          <div><span className="text-green-400">banner</span> - Show welcome banner</div>
          <div><span className="text-green-400">resume</span> - Download resume</div>
          <div><span className="text-green-400">whoami</span> - Who is this?</div>
          <div><span className="text-green-400">date</span> - Show current date</div>
          <div><span className="text-green-400">joke</span> - Random dev joke</div>
        </div>
      </div>
    ),

    about: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">About Maxwell Fernandes</div>
        <div>Computer Engineering Student & Software Developer</div>
        <div className="text-gray-300">
          Passionate about developing efficient software solutions.
          Expertise in web and mobile development using Java, Python, JavaScript, React, and Flutter.
        </div>
        <div className="mt-2">
          <span className="text-green-400">Location:</span> Goa, India
        </div>
        <div>
          <span className="text-green-400">Interests:</span> System Design, Machine Learning
        </div>
      </div>
    ),

    skills: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">Technical Skills:</div>
        <div className="space-y-1">
          <div><span className="text-yellow-400">Languages:</span> Java, Python, C++, C, Dart, JavaScript, TypeScript</div>
          <div><span className="text-yellow-400">Frontend:</span> React.js, HTML5, CSS3, Tailwind, Bootstrap, Redux</div>
          <div><span className="text-yellow-400">Mobile:</span> Flutter, React Native</div>
          <div><span className="text-yellow-400">Databases:</span> MySQL, MongoDB, Firebase, GraphQL</div>
          <div><span className="text-yellow-400">Tools:</span> Git, GitHub, Docker, VSCode, IntelliJ IDEA, Vim</div>
        </div>
      </div>
    ),

    projects: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">Featured Projects:</div>
        <div className="space-y-3">
          <div>
            <div className="text-green-400">1. Quickart</div>
            <div className="text-sm text-gray-300">Grocery delivery app - Flutter, Firebase</div>
          </div>
          <div>
            <div className="text-green-400">2. Download Accelerator</div>
            <div className="text-sm text-gray-300">Multi-threaded file downloader - Java</div>
          </div>
          <div>
            <div className="text-green-400">3. Toralizer</div>
            <div className="text-sm text-gray-300">Proxy server - C, Linux</div>
          </div>
          <div>
            <div className="text-green-400">4. Road Pothole Detection</div>
            <div className="text-sm text-gray-300">Computer vision system - Python, OpenCV</div>
          </div>
        </div>
        <div className="mt-2 text-sm">
          💡 Scroll down to see detailed project cards!
        </div>
      </div>
    ),

    contact: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">Contact Information:</div>
        <div><span className="text-green-400">Email:</span> fernandesmax082@gmail.com</div>
        <div><span className="text-green-400">GitHub:</span> github.com/Maxwell-Fernandes</div>
        <div><span className="text-green-400">LinkedIn:</span> linkedin.com/in/maxwell-fernandes-a37007270</div>
        <div><span className="text-green-400">Twitter:</span> @Maxwell65794986</div>
      </div>
    ),

    education: () => (
      <div className="space-y-2">
        <div className="text-[var(--primary)] font-bold">Education:</div>
        <div>
          <div className="text-green-400">Computer Engineering</div>
          <div className="text-sm text-gray-300">Currently pursuing degree with focus on software development</div>
        </div>
      </div>
    ),

    banner: () => (
      <pre className="text-[var(--primary)] text-xs leading-tight">
{`
 __  __                          _ _
|  \\/  | __ ___  ____      _____| | |
| |\\/| |/ _\` \\ \\/ /\\ \\ /\\ / / _ \\ | |
| |  | | (_| |>  <  \\ V  V /  __/ | |
|_|  |_|\\__,_/_/\\_\\  \\_/\\_/ \\___|_|_|

Welcome to Maxwell's Portfolio Terminal!
Type 'help' to see available commands.
`}
      </pre>
    ),

    whoami: () => 'maxwell-fernandes',

    date: () => new Date().toLocaleString(),

    resume: () => {
      window.open('/assets/resume/resume.pdf', '_blank');
      return '📄 Opening resume in new tab...';
    },

    clear: () => '',

    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why did the developer go broke? Because he used up all his cache! 💰",
        "What's a programmer's favorite hangout place? Foo Bar! 🍺",
        "Why do Java developers wear glasses? Because they can't C#! 👓",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?' 🍻"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    const output = commands[trimmedCmd]
      ? commands[trimmedCmd]()
      : <span className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</span>;

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(cmd =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, {
          command: input,
          output: <div className="text-gray-400">{matches.join('  ')}</div>,
          timestamp: new Date()
        }]);
      }
    }
  };

  return (
    <>
      {/* Terminal Toggle Button - Enhanced with animations */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          delay: 2,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Pulsing glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--primary)]/30 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          data-terminal-toggle="true"
          className="relative bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 border-2 border-[var(--primary)]/50"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 40px rgba(34, 211, 238, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>

          {/* Notification dot when not open */}
          {!isOpen && (
            <motion.span
              className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-gray-900"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </motion.button>

        {/* Tooltip hint */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[var(--primary)] text-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
          >
            Try the terminal! 💻
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[var(--primary)] rotate-45"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-8 w-full max-w-3xl z-50"
          >
            <div className="bg-gray-900 rounded-lg shadow-2xl border border-[var(--primary)]/30 overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">maxwell@portfolio:~$</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Terminal Content */}
              <div
                ref={terminalRef}
                className="bg-black/90 p-4 h-96 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Welcome Message */}
                <div className="mb-4">
                  {commands.banner()}
                </div>

                {/* Command History */}
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-3"
                  >
                    <div className="flex items-center gap-2 text-green-400">
                      <span className="text-[var(--primary)]">➜</span>
                      <span className="text-purple-400">~</span>
                      <span className="text-white">{item.command}</span>
                    </div>
                    <div className="mt-1 ml-4 text-gray-100">
                      {item.output}
                    </div>
                  </motion.div>
                ))}

                {/* Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-[var(--primary)]">➜</span>
                  <span className="text-purple-400">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white caret-green-400"
                    autoFocus
                    spellCheck={false}
                  />
                </form>
              </div>

              {/* Terminal Footer */}
              <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 flex justify-between border-t border-gray-700">
                <span>Type 'help' for commands</span>
                <span>↑↓ for history | Tab for autocomplete</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Terminal.displayName = 'Terminal';

export default Terminal;
