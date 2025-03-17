// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

// Create the context
export const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  
  const fetchUserData = async (authToken) => {
    try {
      console.log('Fetching user data from:', `${API_URL}/api/auth/me`);
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Log the error response for debugging
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        // If token is invalid or expired, logout
        logout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const register = async (name, email, password) => {
    try {
      console.log('Registering at:', `${API_URL}/api/auth/register`);
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      // For debugging: log status and attempt to get text/json
      console.log('Registration response status:', response.status);
      const responseText = await response.text();
      console.log('Registration response text:', responseText);
      
      // Try to parse JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON from response:', e);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  };
  
  const login = async (email, password) => {
    try {
      console.log('Logging in at:', `${API_URL}/api/auth/login`);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      // For debugging: log status and attempt to get text
      console.log('Login response status:', response.status);
      const responseText = await response.text();
      console.log('Login response text:', responseText);
      
      // Try to parse JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON from response:', e);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  
  // Add a function to update user data (useful for subscription changes)
  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };
  
  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};