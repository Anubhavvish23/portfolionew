import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    console.log('Request interceptor - Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request headers:', config.headers);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Projects
export const getProjects = () => api.get('/projects');
export const getProject = (id: string) => api.get(`/projects/${id}`);
export const createProject = (data: any) => api.post('/projects', data);
export const updateProject = (id: string, data: any) => api.put(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);

// About Me
export const getAboutMe = () => api.get('/about');
export const updateAboutMe = (data: any) => api.put('/about', data);

// Auth
export const login = (username: string, password: string) => 
  api.post('/admin/login', { username, password });
export const getProfile = () => api.get('/admin/profile');

export default api; 