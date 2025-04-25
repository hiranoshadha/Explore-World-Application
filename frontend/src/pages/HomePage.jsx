// src/pages/HomePage.jsx (updated)
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiBarChart2, FiHelpCircle } from 'react-icons/fi';
import SearchBar from '../components/ui/SearchBar';
import RegionFilter from '../components/ui/RegionFilter';
import CountryGrid from '../components/features/CountryGrid';
import PopularRegions from '../components/features/PopularRegions';
import GlobeVisualization from '../components/features/GlobeVisualization';
import CountryComparison from '../components/features/CountryComparison';
import CountryQuiz from '../components/features/CountryQuiz';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import { useCountries } from '../hooks/useCountries';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const HomePage = () => {
  const { 
    countries, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    selectedRegion, 
    setSelectedRegion 
  } = useCountries();
  
  const [suggestions, setSuggestions] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const { t } = useContext(LanguageContext);
 

  useEffect(() => {
    if (countries.length > 0) {
      const countryNames = countries.map(country => country.name.common);
      setSuggestions(countryNames);
    }
  }, [countries]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <FiGlobe className="text-6xl text-light-primary dark:text-dark-primary" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold mb-2">{t('discoverCountries')}</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          {t('exploreInfo')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          
          {/* <LanguageSwitcher /> */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGlobe(!showGlobe)}
            className="btn flex items-center gap-2 bg-light-card dark:bg-dark-card"
          >
            <FiGlobe />
            <span>{t(showGlobe ? "hideGlobe" : "showGlobe")}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(true)}
            className="btn flex items-center gap-2 bg-light-card dark:bg-dark-card"
          >
            <FiBarChart2 />
            <span>{t('compareCountries')}</span>
          </motion.button>
        </div>
      </motion.div>

      {showGlobe && !loading && countries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <GlobeVisualization countries={countries} height={500} />
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          suggestions={suggestions}
          placeholder={t('search')}
        />
        <RegionFilter 
          selectedRegion={selectedRegion} 
          setSelectedRegion={setSelectedRegion} 
          placeholder={t('filterByRegion')}
        />
      </div>

      <PopularRegions 
        selectedRegion={selectedRegion} 
        setSelectedRegion={setSelectedRegion} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CountryGrid 
            countries={countries} 
            loading={loading} 
            error={error} 
          />
        </div>
        
        <div className="lg:col-span-1">
          {!loading && countries.length > 0 && (
            <CountryQuiz countries={countries} />
          )}
        </div>
      </div>

      <CountryComparison 
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
      />
    </div>
  );
};

export default HomePage;
