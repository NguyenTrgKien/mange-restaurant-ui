import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import paymentInfoReducer from "./paymentInfoReducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    orderInfo: paymentInfoReducer
})

export default rootReducer;