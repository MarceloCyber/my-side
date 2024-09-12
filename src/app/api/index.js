import axios from 'axios';

const API_URL = 'https://fakestoreapi.in/api/products';

// Função para buscar todos os produtos
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // A resposta já é uma lista de produtos
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para buscar um produto por ID
export const fetchProductById = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // A resposta já é uma lista de produtos
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};
