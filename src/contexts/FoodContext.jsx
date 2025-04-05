import { createContext, useEffect, useState } from "react";
import { getAllFood, getProductSold } from "../services/foodServicer";
import { getCart } from "../services/userService";
import { checkLogin } from "../services/loginService";

export const FoodContext = createContext();

export const FoodProvider = ({children}) => {
    const [dataAllFood, setDataAllFood] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(0);
    const [cart, setCart] = useState([]);
    const [login, setLogin] = useState({});
    
    useEffect(() => {
        const isLogin = async() => {
            try{
                const message = await checkLogin();
                if(message.errCode === 0) {
                    setLogin(message.user);
                    localStorage.setItem('userLogin', JSON.stringify(message.user));
                }else{
                    setLogin({});
                }
            }catch(error){     
                setLogin({});
            }
        }
        isLogin();
    }, []);

    const handleGetAllFood = async() => {
        try{
            const data = await getAllFood();
            if(data.errCode === 0) {
                setDataAllFood(data.message);
            } 
        }catch(error) {
            console.log(error);
        }
    }   
    useEffect(() => {
        handleGetAllFood();
    }, []);

    const getCartUser = async() => {
        if(!login && !login.id){
            return;
        }
        try{
            // const response = await getCart(login.id);
            // if(response.errCode === 0) {
            //     localStorage.setItem('food', JSON.stringify(response.cartItem));
                setCart([]);
            // }else{
            //     setCart([]);
            // }
        }catch(error){  
            console.log(error);
        }
    }

    useEffect(() => {
        getCartUser();
    }, [login]);

    return (
        <FoodContext.Provider value={{dataAllFood, handleGetAllFood, currentCategoryId, setCurrentCategoryId, cart, getCartUser}}>
            {children}
        </FoodContext.Provider>
    )
}