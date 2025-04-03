import axiosConfig from './configAxios';

export const createFood = async(formData) => {
    return await axiosConfig.post('/api/v1/create-food', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}                                                 

export const getCategory = async() => {
    return await axiosConfig.get('/api/v1/get-category');
}

export const getFoodBanner = async() => {
    return await axiosConfig.get('/api/v1/get-food-banner');
}

export const getFoodOutstanding = async() => {
    return await axiosConfig.get('/api/v1/get-all-food-popular');
}

export const getAllFood = async() => {
    return await axiosConfig.get('/api/v1/get-all-food');
}

export const deleteFood = async (foodId) => {
    return await axiosConfig.delete(`/api/v1/delete-food/${foodId}`);
}


export const editFood = async(formData) => {
    return await axiosConfig.put(`/api/v1/edit-food`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const getProductSold = async () => {
    return await axiosConfig.get(`/api/v1/get-product-sold`);
}

export const postEvaluate = async (data) => {
    return await axiosConfig.post(`/api/v1/post-evaluate-product`, data);
}

export const getListEvaluate = async (data) => {
    return await axiosConfig.get(`/api/v1/get-evaluate-product/${data}`);
}

export const getDetailEvaluateProduct = async (data) => {
    return await axiosConfig.get(`/api/v1/get-evaluate-detail-product/${data}`);
}