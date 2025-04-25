// src/components/ui/ThemeToggle.jsx
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-light-card dark:bg-dark-card"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="text-xl text-dark-primary" />
      ) : (
        <FiMoon className="text-xl text-light-primary" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
