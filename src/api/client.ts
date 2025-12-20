import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gcub.digitalks.in/api/public/index.php';

export const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle CodeIgniter's response format
client.interceptors.response.use(
    (response) => {
        // CodeIgniter ResourceController sometimes wraps data in a 'data' property
        // Only unwrap if:
        // 1. response.data exists and is an object
        // 2. response.data.data exists
        // 3. response.data.data is an array or object (not a primitive)
        if (
            response.data &&
            typeof response.data === 'object' &&
            'data' in response.data &&
            response.data.data !== undefined &&
            (Array.isArray(response.data.data) || typeof response.data.data === 'object')
        ) {
            response.data = response.data.data;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
