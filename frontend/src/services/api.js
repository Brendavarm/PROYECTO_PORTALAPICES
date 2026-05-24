import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const ADMIN_TOKEN_KEY = 'goaldesk-admin-token';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setAdminToken(token) {
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export const healthCheck = () => api.get('/health');
export const getNetworkInfo = () => api.get('/network-info');
export const adminLogin = (password) => api.post('/admin/login', { password });
export const getStats = () => api.get('/stats');
export const getUsuarios = () => api.get('/usuarios');
export const getPedidos = () => api.get('/pedidos');
export const getProductos = () => api.get('/productos');
export const getPersonalizaciones = () => api.get('/personalizaciones');
export const createPersonalizacion = (data) => api.post('/personalizaciones', data);
export const updatePedidoEstado = (id, estado) =>
  api.patch(`/pedidos/${id}/estado`, { estado });

export default api;
