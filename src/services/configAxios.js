import axios from 'axios';


const axiosConfig = axios.create({
    baseURL: 'https://quanlynhahang.onrender.com',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        'ngrok-skip-browser-warning': 'true'  // Loại bỏ cảnh báo khi gọi api thông qua ngrok
    },
})
// axios.interceptors.request.use(request => {
//     console.log(request);
//     // Edit request config
//     return request;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

axiosConfig.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default axiosConfig;