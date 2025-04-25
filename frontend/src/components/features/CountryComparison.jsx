// src/components/features/CountryComparison.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { api } from '../../services/api';

const CountryComparison = ({ isOpen, onClose }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await api.getAllCountries();
      // Sort countries alphabetically by name
      const sortedData = [...data].sort((a, b) => 
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCountries();
    }
  }, [isOpen]);

  const handleOnClose = () => {
    onClose();
    setSelectedCountries([null, null]);
  };

  const handleCountrySelect = (index, countryCode) => {
    const country = countries.find(c => c.cca3 === countryCode);
    const newSelected = [...selectedCountries];
    newSelected[index] = country;
    setSelectedCountries(newSelected);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-dark-card rounded-xl shadow-xl max-h-[90vh] overflow-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Compare Countries</h2>
          <button
            onClick={handleOnClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {[0, 1].map((index) => (
              <div key={index} className="space-y-4">
                <select
                  className="input"
                  value={selectedCountries[index]?.cca3 || ''}
                  onChange={(e) => handleCountrySelect(index, e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.cca3}>
                      {country.name.common}
                    </option>
                  ))}
                </select>

                {selectedCountries[index] && (
                  <div className="card p-4">
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                      <img
                        src={selectedCountries[index].flags.svg}
                        alt={`Flag of ${selectedCountries[index].name.common}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{selectedCountries[index].name.common}</h3>
                    <p className="mb-1"><span className="font-semibold">Capital:</span> {selectedCountries[index].capital?.[0] || 'N/A'}</p>
                    <p className="mb-1"><span className="font-semibold">Region:</span> {selectedCountries[index].region}</p>
                    <p className="mb-1"><span className="font-semibold">Population:</span> {formatNumber(selectedCountries[index].population)}</p>
                    <p className="mb-1"><span className="font-semibold">Area:</span> {formatNumber(selectedCountries[index].area)} km²</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedCountries[0] && selectedCountries[1] && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Comparison</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-2 text-left">Metric</th>
                    <th className="p-2 text-left">{selectedCountries[0].name.common}</th>
                    <th className="p-2 text-left">{selectedCountries[1].name.common}</th>
                    <th className="p-2 text-left">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-semibold">Population</td>
                    <td className="p-2">{formatNumber(selectedCountries[0].population)}</td>
                    <td className="p-2">{formatNumber(selectedCountries[1].population)}</td>
                    <td className="p-2">
                      {formatNumber(Math.abs(selectedCountries[0].population - selectedCountries[1].population))}
                      {selectedCountries[0].population > selectedCountries[1].population 
                        ? ` (${selectedCountries[0].name.common} is larger)` 
                        : ` (${selectedCountries[1].name.common} is larger)`}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-semibold">Area</td>
                    <td className="p-2">{formatNumber(selectedCountries[0].area)} km²</td>
                    <td className="p-2">{formatNumber(selectedCountries[1].area)} km²</td>
                    <td className="p-2">
                      {formatNumber(Math.abs(selectedCountries[0].area - selectedCountries[1].area))} km²
                      {selectedCountries[0].area > selectedCountries[1].area 
                        ? ` (${selectedCountries[0].name.common} is larger)` 
                        : ` (${selectedCountries[1].name.common} is larger)`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CountryComparison;
