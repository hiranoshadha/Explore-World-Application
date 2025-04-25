// src/components/features/CountryGrid.jsx
import { motion } from 'framer-motion';
import CountryCard from '../ui/CountryCard';
import Skeleton from '../ui/Skeleton';

const CountryGrid = ({ countries, loading, error }) => {
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} type="card" />
        ))}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No countries found</h2>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </motion.div>
  );
};

export default CountryGrid;
