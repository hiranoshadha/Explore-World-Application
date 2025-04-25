// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { FavoritesProvider } from '../src/contexts/FavoritesContext';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import Layout from '../src/components/layout/Layout';
import HomePage from '../src/pages/HomePage';
import DetailPage from '../src/pages/DetailPage';
import FavoritesPage from '../src/pages/FavoritesPage';
import NotFoundPage from '../src/pages/NotFoundPage';
import LoginPage from '../src/pages/LoginPage';
import RegisterPage from '../src/pages/RegisterPage';
import ProtectedRoute from '../src/components/auth/ProtectedRoute';
import AuthProvider from '../src/contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/country/:code" element={<DetailPage />} />
                  <Route path="/favorites" element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </FavoritesProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
