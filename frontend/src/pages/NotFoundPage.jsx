// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-12"
    >
      <FiAlertTriangle className="text-6xl mx-auto mb-4 text-yellow-500" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
