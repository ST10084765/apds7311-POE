import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around components that need access to authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is logged in
  const [user, setUser] = useState(null);

  // Define a function for logging in (this would come from your existing login function)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true); // Set the user as authenticated
  };

  // Define a function for logging out
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
