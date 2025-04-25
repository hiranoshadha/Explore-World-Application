// src/context/LanguageContext.jsx
import { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    discoverCountries: "Discover Countries Across the World",
    exploreInfo: "Explore detailed information about countries, their flags, populations, languages, and more.",
    showGlobe: "Show Globe",
    hideGlobe: "Hide Globe",
    compareCountries: "Compare Countries",
    search: "Search for a country...",
    filterByRegion: "Filter by Region",
    population: "Population",
    region: "Region",
    capital: "Capital",
    languages: "Languages",
    viewDetails: "View Details",
    favorites: "Favorites",
    noFavorites: "No favorites yet",
    exploreCountries: "Explore Countries",
    borderCountries: "Border Countries",
    backButton: "Back",
    viewOnMap: "View on Map"
  },
  si: {
    discoverCountries: "ලෝකය පුරා රටවල් සොයා ගන්න",
    exploreInfo: "රටවල්, ඔවුන්ගේ කොඩි, ජනගහනය, භාෂා සහ තවත් දේ පිළිබඳ විස්තරාත්මක තොරතුරු ගවේෂණය කරන්න.",
    showGlobe: "ගෝලය පෙන්වන්න",
    hideGlobe: "ගෝලය සඟවන්න",
    compareCountries: "රටවල් සංසන්දනය කරන්න",
    search: "රටක් සොයන්න...",
    filterByRegion: "කලාපය අනුව පෙරහන්",
    population: "ජනගහනය",
    region: "කලාපය",
    capital: "අගනුවර",
    languages: "භාෂා",
    viewDetails: "විස්තර බලන්න",
    favorites: "ප්‍රියතම",
    noFavorites: "තවම ප්‍රියතම නැත",
    exploreCountries: "රටවල් ගවේෂණය කරන්න",
    borderCountries: "මායිම් රටවල්",
    backButton: "ආපසු",
    viewOnMap: "සිතියමේ බලන්න"
  },
  ta: {
    discoverCountries: "உலகெங்கிலும் உள்ள நாடுகளைக் கண்டறியுங்கள்",
    exploreInfo: "நாடுகள், அவற்றின் கொடிகள், மக்கள்தொகை, மொழிகள் மற்றும் பலவற்றைப் பற்றிய விரிவான தகவல்களை ஆராயுங்கள்.",
    showGlobe: "உலகத்தைக் காட்டு",
    hideGlobe: "உலகத்தை மறை",
    compareCountries: "நாடுகளை ஒப்பிடுக",
    search: "ஒரு நாட்டைத் தேடுங்கள்...",
    filterByRegion: "பிராந்தியத்தால் வடிகட்டவும்",
    population: "மக்கள்தொகை",
    region: "பிராந்தியம்",
    capital: "தலைநகரம்",
    languages: "மொழிகள்",
    viewDetails: "விவரங்களைக் காண்க",
    favorites: "பிடித்தவை",
    noFavorites: "இன்னும் பிடித்தவை இல்லை",
    exploreCountries: "நாடுகளை ஆராயுங்கள்",
    borderCountries: "எல்லை நாடுகள்",
    backButton: "பின்செல்",
    viewOnMap: "வரைபடத்தில் பார்க்கவும்"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
