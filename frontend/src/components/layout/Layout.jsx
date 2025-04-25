// src/components/layout/Layout.jsx
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const Layout = ({ children }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div key={language} className="app-container">
      <Header />
      <motion.main 
        className="container-custom py-8 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
