import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php/';
export const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
export const API_ROOT = rawBaseUrl.split('/index.php')[0].replace(/\/$/, '');

export const getFullUrl = (path: string | null | undefined) => {
    if (!path || path === '#' || path === 'null') return '';
    const sPath = String(path).trim();

    // If it's already an absolute URL
    if (sPath.startsWith('http')) {
        // In development, we might want to strip the origin to use Vite's proxy
        // But in production, we should keep the absolute URL to ensure it points to the correct backend
        if (import.meta.env.DEV && sPath.includes(API_ROOT)) {
            const relativePart = sPath.split(API_ROOT)[1].replace(/^\/+/, '');
            return `/${relativePart}`;
        }
        return sPath;
    }

    if (sPath.startsWith('//')) return `http:${sPath}`;

    // Clean leading slashes
    const cleanPath = sPath.replace(/^\/+/, '');

    // If it's a relative path, we need to decide where it points.
    // In production, most assets are served from the API.
    if (!import.meta.env.DEV) {
        // For production, it's safer to return an absolute URL pointing to the API root
        // If it already starts with uploads/ or assets/, just prepend API_ROOT
        if (cleanPath.startsWith('uploads/') || cleanPath.startsWith('assets/')) {
            return `${API_ROOT}/${cleanPath}`;
        }
        // Otherwise, assume it's an upload
        return `${API_ROOT}/uploads/${cleanPath}`;
    }

    // Development behavior (original)
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

    // HTTP Method Spoofing for production compatibility (avoiding 403 on PUT/DELETE)
    if (config.method && ['put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        const method = config.method.toUpperCase();

        // Add _method to query params for extra compatibility with some WAFs/Servers
        config.params = { ...config.params, _method: method };

        // If it's a JSON request, add _method to the data
        if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
            config.data = { ...config.data, _method: method };
        } else if (config.data instanceof FormData) {
            config.data.append('_method', method);
        } else if (!config.data) {
            config.data = { _method: method };
        }

        config.method = 'post';
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
