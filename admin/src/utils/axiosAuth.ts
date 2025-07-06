import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use(cfg => {
  const tk = localStorage.getItem('token');
  if (tk) cfg.headers.Authorization = `Bearer ${tk}`;
  return cfg;
});
export default api;
