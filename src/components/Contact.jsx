import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaComment } from 'react-icons/fa';
import { FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import MagneticWrapper from './MagnetImage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // API URL - use environment variable or fallback to localhost for development
  const API_URL = import.meta.env.VITE_API_URL;

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/souvik-dhara-3a4bab336/',
      color: '#0077B5',
    },
    {
      name: 'X (Twitter)',
      icon: FaXTwitter,
      url: 'https://x.com/SouvikDhara99/',
      color: '#000000',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/biksou84/',
      color: '#E4405F',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        // Handle specific error cases
        if (response.status === 429) {
          setSubmitStatus('rate-limited');
        } else {
          console.error('Error:', data.message);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetStatus = () => {
    setSubmitStatus(null);
  };

  return (
    <section id="contact" className="pt-16 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Image and Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Profile Image */}
            <MagneticWrapper>
              <img
                src="/Souvik.webp"
                alt="Souvik"
                className="w-64 h-64 rounded-full object-cover shadow-2xl"
              />
            </MagneticWrapper>

            {/* Social Icons */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <MagneticWrapper key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 dark:bg-dark/10 backdrop-blur-lg rounded-full hover:bg-primary/20 transition-colors duration-300"
                    style={{ color: social.color }}
                  >
                    <social.icon className="text-3xl transition-colors duration-300" />
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 dark:bg-dark/5 backdrop-blur-lg rounded-xl p-8"
          >
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg"
              >
                <p className="text-green-800 dark:text-green-200 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}

            {submitStatus === 'rate-limited' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg"
              >
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  Too many messages sent. Please try again after 15 minutes.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg"
              >
                <p className="text-red-800 dark:text-red-200 font-medium">
                  Failed to send message. Please try again later or contact me directly.
                </p>
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={resetStatus}
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-6 py-3 bg-white dark:bg-dark/40 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={resetStatus}
                  placeholder="Your Email"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-6 py-3 bg-white dark:bg-dark/40 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <FaComment className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={resetStatus}
                  placeholder="Your Message"
                  required
                  rows="4"
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-6 py-3 bg-white dark:bg-dark/40 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;