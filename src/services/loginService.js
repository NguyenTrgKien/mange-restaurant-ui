import axiosConfig from "./configAxios"

export const loginUser = async(data) => {
    return await axiosConfig.post('api/v1/user-login', data);
}

export const checkLogin = async() => {
    return await axiosConfig.get('/api/v1/check-login');
}

export const userLogout = async() => {
    return await axiosConfig.post('/api/v1/logout');
}