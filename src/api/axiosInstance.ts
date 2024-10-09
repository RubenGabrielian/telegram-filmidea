import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://devback.filmidea.tv/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
