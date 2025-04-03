import axiosConfig from "./configAxios"

export const authLoginGoogle = async(data) => {
    return await axiosConfig.post('/api/v1/auth-login-google', data);
}