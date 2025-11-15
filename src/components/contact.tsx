import { useState } from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission (e.g., EmailJS, Formspree, or backend API)
    // Currently just shows an alert without sending the data anywhere
    alert("Thank you for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <section id="contact" className="py-12 px-6 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-cyan-400"
        >
          Contact Me
        </motion.h2>

        <p className="text-gray-300 mt-4">
          Feel free to reach out! Fill in the form below.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          ></textarea>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <div className="mt-6 flex justify-center space-x-4">
          <a href="https://github.com/Maxwell-Fernandes/Maxwell-Fernandes" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/maxwell-fernandes-a37007270/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
