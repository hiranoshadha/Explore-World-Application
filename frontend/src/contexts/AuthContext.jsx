// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const register = (userData) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === userData.email);
    
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In a real app, you should hash this
      favorites: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
  };

  const login = (credentials) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    
    
    if (user) {
      // Store current user in localStorage and state
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const updateUserFavorites = (favorites) => {
    if (!user) return;
    
    // Update user in state
    const updatedUser = { ...user, favorites };
    setUser(updatedUser);
    
    // Update user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, favorites } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        register, 
        login, 
        logout,
        updateUserFavorites
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
