// src/hooks/useCountries.js
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const fetchAllCountries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch countries. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  useEffect(() => {
    if (countries.length > 0) {
      let result = [...countries];
      
      // Filter by region
      if (selectedRegion) {
        result = result.filter(country => 
          country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
      }
      
      // Filter by search term
      if (searchTerm) {
        result = result.filter(country => 
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (country.name.official && country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setFilteredCountries(result);
    }
  }, [countries, searchTerm, selectedRegion]);

  const getCountryByCode = useCallback(async (code) => {
    try {
      setLoading(true);
      const data = await api.getCountryByCode(code);
      return data[0];
    } catch (err) {
      setError(`Failed to fetch country with code ${code}`);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    countries: filteredCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    getCountryByCode,
    refetch: fetchAllCountries
  };
};
