import API_URL from './apiConfig';

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
    // Adaptar o formato dos dados para o formato esperado pelo backend
    const apiData = {
      name: userData.name,
      email: userData.email, 
      password: userData.password,
      // Outros dados que seriam necessários para o cadastro de User
      cpf: userData.cpf,
      phone: userData.phone
    };

    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Falha no registro. Por favor, tente novamente.');
    }
    
    // Salvar dados do usuário no localStorage
    const userToSave = {
      id: data.id || null,
      name: userData.name,
      email: userData.email
    };
    
    setUser(userToSave);
    
    // Se a API retornar um token, armazená-lo
    if (data.token) {
      setToken(data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Erro no registro:', error);
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
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Falha no login. Verifique suas credenciais.');
    }
    
    // Definir simulação de usuário baseado no email (temporário até que o backend retorne os dados corretos)
    const user = {
      id: data.id || Date.now(), // Usar o ID retornado ou um timestamp como fallback
      email: credentials.email,
      name: data.name || credentials.email.split('@')[0] // Usar o nome antes do @ como fallback
    };
    
    // Salvar dados do usuário
    setUser(user);
    
    // Se a API retornar um token, armazená-lo
    if (data.token) {
      setToken(data.token);
    } else {
      // Caso a API não retorne um token, criar um token simulado
      setToken(`sim-token-${Date.now()}`);
    }
    
    return { user, success: true };
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  removeToken();
  removeUser();
  
  // Remover quaisquer outros dados armazenados relacionados ao usuário
  sessionStorage.removeItem('currentOrder');
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken();
};

// Get current authenticated user
const getCurrentUser = () => {
  return getUser();
};

const authService = {
  register,
  login,
  logout,
  getToken,
  isAuthenticated,
  getCurrentUser,
};

export default authService;