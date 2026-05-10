import { createContext, useState, useContext, useEffect } from 'react';
import client from '../services/client';

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const loadEmployee = async () => {
      if (!token) return;

      try {
        const response = await client.get('/identity/me');
        setEmployee(response.data.employee);
      } catch (error) {
        console.error('Failed to load current employee', error);
        localStorage.removeItem('token');
        setToken(null);
        setEmployee(null);
      }
    };

    loadEmployee();
  }, [token]);

  const authenticate = async (emailAddress, password) => {
    try {
      const response = await client.post('/identity/login', { emailAddress, password });
      const { token: newToken, employee: employeeData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setEmployee(employeeData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Authentication failed' };
    }
  };

  const register = async (fullName, emailAddress, password, accessLevel = 'standard') => {
    try {
      const response = await client.post('/identity/register', { fullName, emailAddress, password, accessLevel });
      const { token: newToken, employee: employeeData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setEmployee(employeeData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setEmployee(null);
  };

  const isAuthenticated = !!token;

  return (
    <UserContext.Provider value={{ employee, token, authenticate, register, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};