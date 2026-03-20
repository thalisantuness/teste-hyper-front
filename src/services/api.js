import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://44.202.78.174:4000";

console.log('🌐 API URL:', API_URL);

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@App:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post("/login", credentials)
};

export const transacoes = {
  listar: (isAdmin) => 
    api.get(isAdmin ? "/admin/transacoes" : "/minhas-transacoes"),
};

export const pagamentos = {
  criarAssinatura: (cardToken) => 
    api.post("/assinaturas", { cardToken })
};