// src/components/features/PopularRegions.jsx
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

const regions = [
  { name: 'Africa', icon: '🌍' },
  { name: 'Americas', icon: '🌎' },
  { name: 'Asia', icon: '🌏' },
  { name: 'Europe', icon: '🌍' },
  { name: 'Oceania', icon: '🌏' }
];

const PopularRegions = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedRegion('')}
        className={`btn flex items-center gap-2 ${
          selectedRegion === '' 
            ? 'bg-light-primary dark:bg-dark-primary text-white dark:text-dark-background' 
            : 'bg-light-card dark:bg-dark-card'
        }`}
      >
        <FiGlobe />
        <span>All</span>
      </motion.button>

      {regions.map((region) => (
        <motion.button
          key={region.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedRegion(region.name)}
          className={`btn flex items-center gap-2 ${
            selectedRegion === region.name 
              ? 'bg-light-primary dark:bg-dark-primary text-white dark:text-dark-background' 
              : 'bg-light-card dark:bg-dark-card'
          }`}
        >
          <span>{region.icon}</span>
          <span>{region.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default PopularRegions;
