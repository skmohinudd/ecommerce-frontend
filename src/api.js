import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/api/orders`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/api/orders`, orderData);
  return response.data;
};