//this is made for useContext experiment. 
//this component is not currently in use

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../JS assets/MasterPage";
import { GetCartItems } from "./GetCartItems";
import { toast } from "react-toastify";


const initialValues = {
    cartData: [],
    updateCart: () => { },
    emptyCart: () => { }
};

export const CartContext = createContext(initialValues);


export const CartWrapper = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    const userCreds = useContext(UserInfo);


    const updateCart = async() => {
        await GetCartItems(Number(userCreds.userId)).then((Response) => {
            //console.log(Response.data);
            setCartData(Response.data.result);
        }).catch(() => {
            toast.error("Cart items can't be retrieved", {position: 'bottom-right'});
        })
    }

    const emptyCart = () => {
        setCartData([]);
    }

    let values = {cartData, updateCart, emptyCart};


    useEffect(() => {
        if(userCreds.userId){
            updateCart();
        }    
    }, [userCreds]);

    return <CartContext.Provider value = {values}> {children} </CartContext.Provider>;
}

export default CartContext;