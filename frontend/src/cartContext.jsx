import { createContext,useState,useContext } from "react"

const forCartContext = createContext()

export function CartContext({children}){

    const [cart,setCart] = useState([]);

    const addToCart = (item)=>{
      
        setCart((prevCart)=>[...prevCart,item]);
    }

    const removeFromCart = (itemId)=>{

        setCart((prevCart)=>prevCart.filter((cartItem)=>cartItem.id!==itemId))
    }

    return (
        <forCartContext.Provider value={{cart,addToCart,removeFromCart}}>

       {children}

        </forCartContext.Provider>
    )
}

export function useCart (){
    return useContext(forCartContext);
};


