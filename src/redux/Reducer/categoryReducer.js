import { actionType } from "../actionType";

const initState = {
    category: '',
}

const categoryReducer = (state=initState, action) => {
    switch(action.type) {
        case actionType.GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        default :
            return state;
    }
}



export default categoryReducer;
