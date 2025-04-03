import axiosConfig from "./configAxios"

export const getCart = async(userId) => {
    return await axiosConfig.get(`/api/v1/get-cart/${userId}`);
}

export const addProductCart = async(data) => {
    return await axiosConfig.post('/api/v1/add-product-cart', data);
}

export const updateQuantityOrderCart = async(data) => {
    return await axiosConfig.put('/api/v1/update-quantity-order-cart', data);
}

export const updateAllCart = async(data) => {
    return await axiosConfig.put('/api/v1/update-all-cart', data);
}

export const deleteProductCart = async(userId, foodId) => {
    return await axiosConfig.delete(`/api/v1/delete-product-cart?userId=${userId}&foodId=${foodId}`);
}

export const deleteAllCart = async(userId) => {
    return await axiosConfig.delete(`/api/v1/delete-all-cart?userId=${userId}`);
}

export const getUserOrderHistory = async(userId) => {
    return await axiosConfig.get(`/api/v1/get-user-order-history/${userId}`);
}

export const getUserOrderTableHistory = async(userId) => {
    return await axiosConfig.get(`/api/v1/get-user-order-table-history/${userId}`);
}

export const paymentAtRestaurant = async(data) => {
    return await axiosConfig.post('/api/v1/payment-at-restaurant', data);
}

export const paymentTableAtRestaurant = async(data) => {
    return await axiosConfig.post('/api/v1/payment-table-at-restaurant', data);
}

export const getAllOrderForAdmin = async() => {
    return await axiosConfig.get('/api/v1/get-all-order-dish-for-admin');
}

export const authPayment = async(data) => {
    return await axiosConfig.put('/api/v1/auth-payment', data);
}

export const handlRegister = async(data) => {
    return await axiosConfig.post('/api/v1/user-register', data);
}

export const getAllOrderTableDishForAdmin = async() => {
    return await axiosConfig.get('/api/v1/get-all-order-table-dish-for-admin');
}

export const getProfileUser = async(data) => {
    return await axiosConfig.get(`/api/v1/get-profile-user/${data}`);
}

export const updateProfileUser = async(data) => {
    return await axiosConfig.put(`/api/v1/update-profile-user`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}