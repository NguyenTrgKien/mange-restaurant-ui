import axiosConfig from "./configAxios"


export const postPayment = async() => {
    return await axiosConfig.post('api/v1/payment-momo-url');
}   

export const postOrder = async(data) => {
    return await axiosConfig.post('/api/v1/order', data);
}

export const postOrderDishTable = async(data) => {
    return await axiosConfig.post('/api/v1/payment-dish-table', data);
}

export const postPaymentAtRestaurant = async(data) => {
    return await axiosConfig.post('/api/v1/payment-at-restaurant', data);
}

export const checkOrderTableDish = async(data) => {
    return await axiosConfig.post('/api/v1/check-order-table-dish', data);
}

export const getDetailOrder = async(data) => {
    return await axiosConfig.get(`/api/v1/get-detail-order/${data}`);
}

export const handleCancelOrder = async(data) => {
    return await axiosConfig.put(`/api/v1/cancel-order/${data}`);
}
