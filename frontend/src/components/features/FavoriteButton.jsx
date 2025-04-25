// src/components/features/FavoriteButton.jsx
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FavoritesContext } from '../../contexts/FavoritesContext';

const FavoriteButton = ({ country }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isCountryFavorite = isFavorite(country.cca3);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isCountryFavorite) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full ${
        isCountryFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-white/80 dark:bg-dark-card/80 text-gray-600 dark:text-gray-300'
      }`}
      aria-label={isCountryFavorite ? `Remove ${country.name.common} from favorites` : `Add ${country.name.common} to favorites`}
    >
      <FiHeart 
        className={isCountryFavorite ? 'fill-current' : ''} 
      />
    </motion.button>
  );
};

export default FavoriteButton;
