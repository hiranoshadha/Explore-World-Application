// src/components/ui/CountryCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FavoriteButton from '../features/FavoriteButton';

const CountryCard = ({ country }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };

  const getLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  };

  return (
    <motion.div
      className="h-[300px] perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden card">
          <div className="relative h-1/2">
            <img 
              src={country.flags.svg || country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <FavoriteButton country={country} />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 truncate">{country.name.common}</h3>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden card rotateY-180 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2 truncate">{country.name.common}</h3>
            <p><span className="font-semibold">Population:</span> {formatPopulation(country.population)}</p>
            <p><span className="font-semibold">Languages:</span> {getLanguages(country.languages)}</p>
          </div>
          <Link 
            to={`/country/${country.cca3}`}
            className="btn btn-primary w-full text-center"
          >
            View Details
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CountryCard;
