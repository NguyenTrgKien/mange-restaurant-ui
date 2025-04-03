import axiosConfig from "./configAxios"

export const createStaff = async(formData) =>{
    return await axiosConfig.post('/api/v1/create-staff', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
} 

export const getAllStaff = async() =>{
    return await axiosConfig.get('/api/v1/get-all-staff');
} 

export const getStatusStaff = async() => {
    return await axiosConfig.get('/api/v1/get-status-staff');
}


export const getPositionStaff = async() => {
    return await axiosConfig.get('/api/v1/get-position-staff');
}


export const editStaff = async(formData) => {
    return await axiosConfig.put('/api/v1/edit-staff', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}


export const deleteStaff = async(userId) => {
    return await axiosConfig.delete(`/api/v1/delete-staff?userId=${userId}`);
}