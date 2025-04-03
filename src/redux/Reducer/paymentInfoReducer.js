import { actionType } from "../actionType";

const loadState = () => {
    const data = sessionStorage.getItem('paymentInfo');
    return data ? JSON.parse(data) : {};
}

const initState = {
    paymentInfo: loadState(),
}

const paymentInfoReducer = (state=initState, action) => {
    switch(action.type) {
        case actionType.GET_PAYMENTINFO:
            sessionStorage.setItem('paymentInfo', JSON.stringify(action.payload));
            const newState = {
                ...state,
                paymentInfo: action.payload
            }
            return newState;
        default :
            return state;
    }
}



export default paymentInfoReducer;
