import axiosConfig from "../services/configAxios";

export const actionType = {
    GET_CATEGORY: 'GET_CATEGORY',
    GET_DETAILORDER: 'GET_DETAILORDER',
    GET_PAYMENTINFO: 'GET_PAYMENTINFO'
}

const category = (value) => {
    return {
        type: actionType.GET_CATEGORY,
        payload: value
    }
}

export const getPaymentInfo = (value) => {
    return {
        type: actionType.GET_PAYMENTINFO,
        payload: value
    }
}

export const detailOrder = (value) => {
    return {
        type: actionType.GET_DETAILORDER,
        payload: value
    }
}

export const getCategory = () => {
    return async(dispatch) => {
        try{
            const data = await axiosConfig.get('/api/v1/get-category');
            if(data && data.errCode === 0) {
                dispatch(category(data));
            }
        }catch(error){
            throw Error(error);
        }
    }
}
