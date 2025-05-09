// API base URL - replace with your actual API endpoint
const API_URL = "http://localhost:8080/api";

// Store the token in localStorage
const setToken = (token) => {
  localStorage.setItem('userToken', token);
};

// Get the token from localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Remove token on logout
const removeToken = () => {
  localStorage.removeItem('userToken');
};

// Store user data in localStorage
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data on logout
const removeUser = () => {
  localStorage.removeItem('user');
};

// Register a new user
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Save token and user data
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Save token and user data
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout user
const logout = () => {
  removeToken();
  removeUser();
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken();
};

const authService = {
  register,
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated,
};

export default authService;