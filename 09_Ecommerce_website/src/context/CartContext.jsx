import { createContext, useState } from "react"



export const CartContext= createContext();

export const CartProvider=({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartList, setCartList] = useState([])

    const addItemToCart=(product, qty = 1)=>{
        setCartList((prevCart)=>{
            const productExist = prevCart.find((item)=>item.id===product.id);

            if (productExist){
                return prevCart.map((item)=>
                    item.id === productExist.id ?
                    {...item, quantity:item.quantity + qty} : item
                )
            }else{
                return[...prevCart, {...product, quantity: qty}];
            }
        })
    }
        const removeItemToCart =(product, qty = 1)=>{
             setCartList((prevCart)=>{
                const existingItem = prevCart.find((item) => item.id === product.id);
                if (existingItem.quantity > 1) {
                    return prevCart.map((item) =>
                        item.id === product.id
                        ? { ...item, quantity: item.quantity - qty }
                        : item
                    );
                    }else{
                    return prevCart.filter((item) => item.id !== product.id);
                    }
                })
        }

    const cartOpen= ()=>setIsCartOpen(true);
    const cartClose= ()=>setIsCartOpen(false);
    return (
        <CartContext.Provider value={{
            cartList,
            isCartOpen, 
            cartOpen, 
            cartClose, 
            addItemToCart, 
            removeItemToCart
            }}>
            {children}
        </CartContext.Provider>
    )
}