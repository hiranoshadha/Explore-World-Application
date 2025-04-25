// src/components/ui/LanguageSwitcher.jsx
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  console.log("language: setLanguage:", language,setLanguage);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-2 py-1 rounded-md text-sm ${
            language === lang.code
              ? 'bg-light-primary dark:bg-dark-primary text-white dark:text-dark-background'
              : 'bg-light-card dark:bg-dark-card'
          }`}
        >
          {lang.name}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
