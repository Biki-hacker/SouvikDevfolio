import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white/5 dark:bg-dark/5 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Souvik Dhara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 