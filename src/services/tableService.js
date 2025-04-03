import axiosConfig from './configAxios.js'

export const getAllTable = async () => {
    return await axiosConfig.get('/api/v1/get-all-table');
}

export const orderTable = async(data) => {
    return await axiosConfig.post(`/api/v1/order-table`, data);
}

export const getAllTimeFrame = async() => {
    return await axiosConfig.get(`/api/v1/get-all-time-frame`);
}

export const updateTable = async(data) => {
    return await axiosConfig.put(`/api/v1/update-table`, data);
}

export const updateStatusOrderTable = async(data) => {
    return await axiosConfig.put(`/api/v1/update-status-order-table`, data);
}

export const getDetailOrderTable = async(data) => {
    return await axiosConfig.get(`/api/v1/get-detail-order-table/${data}`);
}
