// src/context/FavoritesContext.jsx (updated)
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user, updateUserFavorites, isAuthenticated } = useContext(AuthContext);

  // Initialize favorites from user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User", user);
      setFavorites(user.favorites || []);
    } else {
      // For non-authenticated users, use localStorage directly
      const savedFavorites = localStorage.getItem('guestFavorites');
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    }
  }, [isAuthenticated]);

 // Save favorites when they change
  useEffect(() => {
    if (isAuthenticated && user) {
      // Only update if favorites have actually changed from user.favorites
      const currentFavoritesIds = new Set(favorites.map(f => f.cca3));
      const userFavoritesIds = new Set((user.favorites || []).map(f => f.cca3));
      
      // Check if the sets are different before updating
      const needsUpdate = currentFavoritesIds.size !== userFavoritesIds.size || 
        [...currentFavoritesIds].some(id => !userFavoritesIds.has(id));
      
      if (needsUpdate) {
        updateUserFavorites(favorites);
      }
    } else {
      // For non-authenticated users, use localStorage directly
      localStorage.setItem('guestFavorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user, updateUserFavorites]);

  const addToFavorites = (country) => {
    setFavorites((prev) => {
      if (!prev.some(fav => fav.cca3 === country.cca3)) {
        return [...prev, country];
      }
      return prev;
    });
  };

  const removeFromFavorites = (countryCode) => {
    setFavorites(prev => prev.filter(country => country.cca3 !== countryCode));
  };

  const isFavorite = (countryCode) => {
    return favorites.some(country => country.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
