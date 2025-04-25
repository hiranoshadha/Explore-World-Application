// src/components/layout/Footer.jsx
import { FiGithub, FiHeart, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 bg-light-card dark:bg-dark-card text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="container-custom flex flex-col items-center space-y-3">
        <p className="flex items-center gap-1">
          <span>Built with</span>
          <FiHeart className="text-red-500 animate-pulse" />
          <span>React, Vite & Tailwind CSS</span>
        </p>
        <p className="text-xs">
          🌍 Powered by <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-light-primary dark:hover:text-dark-primary">REST Countries API</a>
        </p>
        <a 
          href="https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22630384.git" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-light-primary dark:hover:text-dark-primary"
        >
          <FiGithub />
          <span>View Code on GitHub</span>
        </a>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          © {new Date().getFullYear()} Hiran Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

