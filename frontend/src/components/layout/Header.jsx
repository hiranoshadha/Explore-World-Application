// src/components/layout/Header.jsx (updated)
import { Link } from 'react-router-dom';
import { FiGlobe, FiLogIn, FiLogOut, FiUser, FiHeart } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-sm">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FiGlobe className="text-light-primary dark:text-dark-primary" />
          <span>Explore World</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/favorites" 
            className="flex items-center gap-1 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            <FiHeart />
            <span>Favorites</span>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1">
                <FiUser />
                <span>{user.name}</span>
              </span>
              <button 
                onClick={logout}
                className="flex items-center gap-1 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              <FiLogIn />
              <span>Login</span>
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
