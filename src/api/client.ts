import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php/';
export const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
export const API_ROOT = rawBaseUrl.split('/index.php')[0].replace(/\/$/, '');

export const getFullUrl = (path: string | null | undefined) => {
    if (!path || path === '#' || path === 'null') return '';
    const sPath = String(path).trim();

    // If it's already an absolute URL
    if (sPath.startsWith('http')) {
        // If it points to our backend, convert it to a relative path to use the proxy
        if (sPath.includes(API_ROOT)) {
            const relativePart = sPath.split(API_ROOT)[1].replace(/^\/+/, '');
            return `/${relativePart}`;
        }
        return sPath;
    }

    if (sPath.startsWith('//')) return `http:${sPath}`;

    // Clean leading slashes
    const cleanPath = sPath.replace(/^\/+/, '');

    // If it's a relative path that doesn't start with uploads/ or assets/, 
    // it's likely a document upload missing the prefix
    if (!cleanPath.startsWith('uploads/') && !cleanPath.startsWith('assets/')) {
        return `/uploads/${cleanPath}`;
    }

    return `/${cleanPath}`;
};

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
