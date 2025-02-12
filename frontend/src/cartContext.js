import { createContext,useState,useContext } from "react"
import CartPage from "./cart";
import { CenteredBox } from "./App";




const forCatrContext = createContext()

export function CartContext(){

    const [cart,setCart] = useState([]);

    const addToCart = (item)=>{
        setCart((prevCart)=>[...prevCart,item]);
    }

    const removeFromCart = (itemName)=>{
        setCart((prevCart)=>prevCart.filter((cartItem)=>cartItem.name!== itemName));
    }

    return (
        <forCatrContext.Provider value={{cart,addToCart,removeFromCart}}>

        <CenteredBox/>
        <CartPage/>



        </forCatrContext.Provider>
    )
}

export const useCart = ()=>{
    return useContext(forCatrContext);
};


