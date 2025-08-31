import { createContext, useState } from "react"



export const CartContext= createContext();

export const CartProvider=({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartOpen= ()=>setIsCartOpen(true);
    const cartClose= ()=>setIsCartOpen(false);
    return (
        <CartContext.Provider value={{isCartOpen, cartOpen, cartClose}}>
            {children}
        </CartContext.Provider>
    )
}