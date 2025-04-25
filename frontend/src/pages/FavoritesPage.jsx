// src/pages/FavoritesPage.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import CountryGrid from '../components/features/CountryGrid';
import { FavoritesContext } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <FiHeart className="text-6xl mx-auto mb-4 text-gray-300 dark:text-gray-700" />
        <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
        <p className="mb-6">Start exploring countries and add them to your favorites!</p>
        <Link to="/" className="btn btn-primary">
          Explore Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Favorite Countries</h1>
        <p className="text-gray-600 dark:text-gray-300">
          You have {favorites.length} {favorites.length === 1 ? 'country' : 'countries'} in your favorites
        </p>
      </motion.div>

      <CountryGrid countries={favorites} loading={false} error={null} />
    </div>
  );
};

export default FavoritesPage;
