import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    const addToCart = (newItem) =>{ 

        setCart((prevCart) => {
        const existingItem = prevCart.find(
        (item) => item.cartId === newItem.cartId
        );
        
        if(existingItem){
            return prevCart.map((item)=>{
                return item.cartId === newItem.cartId
                ?{ ...item, selectedQuantity: item.selectedQuantity + newItem.selectedQuantity }
                : item
            }) 
        }else{
            return[...prevCart, newItem];
        }
    })
}

    return (<CartContext.Provider value = {{cart, addToCart}}>
        {children}
    </CartContext.Provider>)
}

export {CartContext, CartProvider}

