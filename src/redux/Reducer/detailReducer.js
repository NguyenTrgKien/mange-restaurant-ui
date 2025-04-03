import { actionType } from "../actionType";

const loadState = () => {
    const data = localStorage.getItem('detailOrder');
    return data ? JSON.parse(data) : {}
}

const initState = {
    detailOrder: loadState(),
}

const detailOrder = (state=initState, action) => {
    switch(action.type) {
        case actionType.GET_DETAILORDER:
            console.log("Nhận được");
            const newState = {
                ...state,
                detailOrder: action.payload
            }
            localStorage.setItem('detailOrder', JSON.stringify(action.payload));
            return newState;
        default :
            return state;    
    }
}



export default detailOrder;
