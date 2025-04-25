// src/components/ui/RegionFilter.jsx
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const regions = ['All','Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const RegionFilter = ({ selectedRegion, setSelectedRegion }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRegionSelect = (region) => {
    if (region === 'All') {
      setSelectedRegion('');
    } else {
      setSelectedRegion(region === selectedRegion ? '' : region);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="input flex items-center justify-between min-w-[200px]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedRegion || 'Filter by Region'}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-dark-card rounded-lg shadow-lg"
            role="listbox"
          >
            {regions.map((region) => (
              <li
                key={region}
                onClick={() => handleRegionSelect(region)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedRegion === region ? 'bg-light-primary/10 dark:bg-dark-primary/10' : ''
                }`}
                role="option"
                aria-selected={selectedRegion === region}
              >
                {region}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionFilter;
