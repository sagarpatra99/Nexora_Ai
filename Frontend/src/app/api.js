// services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/get-me"),
  logout: () => api.post("/auth/logout"),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get("/product", { params }),
  getProduct: (id) => api.get(`/product/${id}`),
  createProduct: (data) => api.post("/product", data),
  getRecommendations: (id) => api.get(`/product/recommend/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data) => api.post("/cart", data),
  updateCartItem: (productId, data) => api.put(`/cart/${productId}`, data),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
};