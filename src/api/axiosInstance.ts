import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://devback.filmidea.tv/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'x-localization': 'ru'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
