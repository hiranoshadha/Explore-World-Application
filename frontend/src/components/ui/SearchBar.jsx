// src/components/ui/SearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm, suggestions = [] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setShowSuggestions(isFocused && suggestions.length > 0 && searchTerm.length > 0);
  }, [isFocused, suggestions, searchTerm]);

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full ">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="input pl-10 pr-10"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <FiX className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-dark-card rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <ul>
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
