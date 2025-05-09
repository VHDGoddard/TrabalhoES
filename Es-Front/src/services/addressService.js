import API_URL from './apiConfig';
import authService from './authService';

// Obter token de autenticação
const getAuthHeader = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Buscar todos os endereços
const getAllAddresses = async () => {
  try {
    const response = await fetch(`${API_URL}/endereco/getAll`, {
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar endereços');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar endereços:', error);
    throw error;
  }
};

// Buscar endereço por ID
const getAddressById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/endereco/read/${id}`, {
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar detalhes do endereço');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar endereço com ID ${id}:`, error);
    throw error;
  }
};

// Criar um endereço
const createAddress = async (addressData) => {
  try {
    console.log(addressData)
    const response = await fetch(`${API_URL}/endereco/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(addressData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar endereço');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar endereço:', error);
    throw error;
  }
};

// Atualizar um endereço
const updateAddress = async (id, addressData) => {
  try {
    const response = await fetch(`${API_URL}/endereco/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(addressData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao atualizar endereço');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar endereço com ID ${id}:`, error);
    throw error;
  }
};

// Excluir um endereço
const deleteAddress = async (id) => {
  try {
    const response = await fetch(`${API_URL}/endereco/delete/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao excluir endereço');
    }

    return true;
  } catch (error) {
    console.error(`Erro ao excluir endereço com ID ${id}:`, error);
    throw error;
  }
};

// Formatar endereços para exibição no front-end
const formatAddressesForDisplay = (addresses) => {
  if (!addresses || !Array.isArray(addresses)) {
    return [];
  }

  // Retorna endereços formatados para exibição
  return addresses.map(address => ({
    id: address.id,
    nickname: address.apelido || 'Meu Endereço',
    street: `${address.rua}, ${address.numero}`,
    complement: address.complemento || '',
    neighborhood: address.bairro,
    city: address.cidade,
    state: address.estado,
    zipcode: address.cep,
    reference: address.referencia || ''
  }));
};

// Buscar endereço por CEP usando ViaCEP API
const getAddressByCEP = async (cep) => {
  try {
    // Remover caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar CEP');
    }
    
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      cep: data.cep,
      street: data.logradouro,
      complement: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
};

const addressService = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  formatAddressesForDisplay,
  getAddressByCEP
};

export default addressService;