import API_URL from './apiConfig';
import authService from './authService';

// Obter token de autenticação
const getAuthHeader = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Criar um pedido
const createOrder = async (orderData) => {
  try {
    // Mapeando para o formato esperado pelo backend
    const pedidoData = {
      user_id: orderData.userId || 1, // Caso não tenha ID, usa 1 como default temporário
      endereco_id: orderData.addressId,
      pagamento_id: orderData.paymentId || null
    };

    const response = await fetch(`${API_URL}/pedido/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(pedidoData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensagem || 'Falha ao criar pedido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

// Adicionar itens a um pedido
const addOrderItems = async (orderId, items) => {
  try {
    const results = [];
    
    // Adiciona cada item individualmente
    for (const item of items) {
      const itemData = {
        pedido_id: orderId,
        produto_id: item.id,
        quantidade: item.quantity
      };
      
      const response = await fetch(`${API_URL}/pedido_item/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(itemData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Falha ao adicionar item ao pedido');
      }
      
      const data = await response.json();
      results.push(data);
    }
    
    return results;
  } catch (error) {
    console.error('Erro ao adicionar itens ao pedido:', error);
    throw error;
  }
};

// Criar um pagamento
const createPayment = async (paymentData) => {
  try {
    const now = new Date();
const pagamentoData = {
  tipo_pagamento: paymentData.paymentMethod.toUpperCase(),
  valor: paymentData.amount,
  horario: now.toISOString().slice(0, 19) // "2025-05-09T14:31:45"
};
console.log(pagamentoData)
    
    const response = await fetch(`${API_URL}/pagamento/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(pagamentoData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensagem || 'Falha ao criar pagamento');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

// Calcula o valor total de um pedido
const calculateOrderTotal = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/pedido/calculateTotal/${orderId}`, {
      headers: {
        ...getAuthHeader()
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao calcular total do pedido');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao calcular total do pedido ${orderId}:`, error);
    throw error;
  }
};

// Recupera um pedido por ID
const getOrderById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/pedido/read/${id}`, {
      headers: {
        ...getAuthHeader()
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao buscar pedido');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar pedido ${id}:`, error);
    throw error;
  }
};

// Busca todos os pedidos
const getAllOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/pedido/getAll`, {
      headers: {
        ...getAuthHeader()
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao buscar pedidos');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
};

// Processo completo de criação de pedido
const processCompleteOrder = async (orderData) => {
  try {
    // 1. Criar o pagamento
    const paymentResponse = await createPayment({
      paymentMethod: orderData.paymentMethod,
      amount: orderData.totalAmount
    });
    
    // Verificar se o pagamento foi criado com sucesso e extrair o ID
    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('Falha ao criar pagamento, ID não retornado');
    }
    
    const paymentId = paymentResponse.id;
    
    // 2. Criar o pedido
    const orderResponse = await createOrder({
      userId: orderData.userId || authService.getCurrentUser()?.id || 1,
      addressId: orderData.addressId,
      paymentId: paymentId
    });
    
    // Verificar se o pedido foi criado com sucesso e extrair o ID
    if (!orderResponse || !orderResponse.id) {
      throw new Error('Falha ao criar pedido, ID não retornado');
    }
    
    const orderId = orderResponse.id;
    
    // 3. Adicionar itens ao pedido
    await addOrderItems(orderId, orderData.items);
    
    // 4. Calcular total do pedido
    const total = await calculateOrderTotal(orderId);
    
    return {
      orderId,
      paymentId,
      total,
      status: 'success'
    };
  } catch (error) {
    console.error('Erro ao processar pedido completo:', error);
    throw error;
  }
};

const orderService = {
  createOrder,
  addOrderItems,
  createPayment,
  calculateOrderTotal,
  getOrderById,
  getAllOrders,
  processCompleteOrder
};

export default orderService;