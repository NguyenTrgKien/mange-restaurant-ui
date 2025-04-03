import axiosConfig from "./configAxios"

export const getMonthlyRevenue = async() => {
    return await axiosConfig.get('/api/v1/get-monthly-revenue');
}