import API_URL from './apiConfig';
import authService from './authService';

// Obter token de autenticação
const getAuthHeader = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Buscar todos os produtos
const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/produto/getAll`, {
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar produtos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Buscar produto por ID
const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/produto/read/${id}`, {
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar detalhes do produto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
};

// Criar um produto
const createProduct = async (productData) => {
  try {
    console.log(productData)
    const response = await fetch(`${API_URL}/produto/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar produto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Atualizar um produto
const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/produto/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao atualizar produto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    throw error;
  }
};

// Excluir um produto
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/produto/delete/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao excluir produto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao excluir produto com ID ${id}:`, error);
    throw error;
  }
};

// Criar uma pizza
const createPizza = async (pizzaData) => {
  try {
    console.log(pizzaData)
    const response = await fetch(`${API_URL}/pizza/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(pizzaData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar pizza');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar pizza:', error);
    throw error;
  }
};

// Criar uma bebida
const createDrink = async (drinkData) => {
  try {
    const response = await fetch(`${API_URL}/bebida/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(drinkData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar bebida');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar bebida:', error);
    throw error;
  }
};

// Formatar produtos para exibição no front-end
const formatProductsForDisplay = (products) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  // Retorna produtos formatados para exibição
  return products.map(product => ({
    id: product.id,
    name: product.nome,
    description: product.observacao,
    price: product.preco,
    image: product.url || getDefaultProductImage(product.tipo),
    type: product.tipo?.toLowerCase() || 'other'
  }));
};

// Obter imagem padrão com base no tipo de produto
const getDefaultProductImage = (type) => {
  if (!type) return '/src/assets/images/default.jpg';
  
  switch(type.toLowerCase()) {
    case 'pizza':
      return '/src/assets/images/pizza1.jpg';
    case 'bebida':
      return '/src/assets/images/bebida-default.jpg';
    default:
      return '/src/assets/images/default.jpg';
  }
};

const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createPizza,
  createDrink,
  formatProductsForDisplay
};

export default productService;