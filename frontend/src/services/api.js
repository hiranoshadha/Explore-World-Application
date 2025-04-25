// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const api = {
  getAllCountries: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error;
    }
  },
  
  getCountryByName: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country by name (${name}):`, error);
      throw error;
    }
  },
  
  getCountriesByRegion: async (region) => {
    try {
      const response = await axios.get(`${BASE_URL}/region/${region}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching countries by region (${region}):`, error);
      throw error;
    }
  },
  
  getCountryByCode: async (code) => {
    try {
      const response = await axios.get(`${BASE_URL}/alpha/${code}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country by code (${code}):`, error);
      throw error;
    }
  }
};
