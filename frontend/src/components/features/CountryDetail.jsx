// src/components/features/CountryDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { api } from '../../services/api';
import Skeleton from '../ui/Skeleton';
import FavoriteButton from './FavoriteButton';

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await api.getCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountry();
    }
  }, [code]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getLanguages = (languages) => {
    return languages ? Object.values(languages) : [];
  };

  const getCurrencies = (currencies) => {
    return currencies ? Object.values(currencies).map(c => `${c.name} (${c.symbol})`) : [];
  };

  if (loading) {
    return <Skeleton type="detail" />;
  }

  if (error || !country) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
        <p>{error || 'Country not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 btn flex items-center gap-2 bg-light-card dark:bg-dark-card"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative">
            <img 
              src={country.flags.svg || country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton country={country} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
            {country.maps?.googleMaps && (
              <a 
                href={country.maps.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn flex items-center gap-2 bg-light-card dark:bg-dark-card"
              >
                <FiExternalLink />
                <span>View on Map</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Official Name:</span> {country.name.official}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Population:</span> {formatNumber(country.population)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
              </p>
            </div>

            <div>
              <p className="mb-2">
                <span className="font-semibold">Top Level Domain:</span> {country.tld?.[0] || 'N/A'}
              </p>
              <div className="mb-2">
                <span className="font-semibold">Currencies:</span>
                <ul className="list-disc list-inside ml-2">
                  {getCurrencies(country.currencies).map((currency, index) => (
                    <li key={index}>{currency}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Languages:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {getLanguages(country.languages).map((language, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-sm rounded-full bg-light-primary/10 dark:bg-dark-primary/10"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <motion.button
                    key={border}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/country/${border}`)}
                    className="px-4 py-2 bg-light-card dark:bg-dark-card rounded-lg shadow-sm"
                  >
                    {border}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetail;
