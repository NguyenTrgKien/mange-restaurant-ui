import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://manage-restaurant-server-production.up.railway.app',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})
axiosConfig.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default axiosConfig;