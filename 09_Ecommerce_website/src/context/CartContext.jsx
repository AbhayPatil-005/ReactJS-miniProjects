import { createContext, useState } from "react"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";

export const CartContext= createContext();

export const CartProvider=({children})=>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartList, setCartList] = useState([])

    const authCtx = useContext(AuthContext);
    const BASE_URL = `https://crudcrud.com/api/9fa80a3d2c6b4acf880107db3fa0f91c/cart`
    
    const loadCart = async(email)=>{
            try{
                const res = await fetch(`${BASE_URL}`);
                const data= await res.json();
                const userCart = data.filter((item)=>item.email === email);
                setCartList(userCart);
            }catch(err){
                console.error("Error fetching cart:", err)
            }   
        }// ✓

    const addItemToCart = async(product, email, qty = 1)=>{
        try{ 
        const productExist = cartList.find((item)=>item.id === product.id);

        if (productExist){
            const updatedItem = {
                title: productExist.title,
                price: productExist.price,
                imageUrl: productExist.imageUrl,
                id: productExist.id,
                email: productExist.email,
                quantity: productExist.quantity + qty,
            };
            await fetch(`${BASE_URL}/${productExist._id}`,{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(updatedItem),
            })
        }else{
            await fetch(`${BASE_URL}`,{
                method:'POST',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    ...product, quantity:qty, email
                }),
            });
        }

            loadCart(email);
        } catch (err) {
            console.error('error saving item', err)
        }
    } // ✓
    
    const removeItemToCart =async(product, email, qty = 1)=>{
        try {
            const existingItem = cartList.find((item) => item.id === product.id);
            if (!existingItem) return;

            if (existingItem.quantity > 1) {
                const updatedItem = {
                    title: existingItem.title,
                    price: existingItem.price,
                    imageUrl: existingItem.imageUrl,
                    id: existingItem.id,
                    email: existingItem.email,
                    quantity: existingItem.quantity - qty,
                };

                await fetch(`${BASE_URL}/${existingItem._id}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedItem),

                });
            } else {
                await fetch(`${BASE_URL}/${existingItem._id}`, {
                    method: 'DELETE'
                });
            }

            loadCart(email)
        } catch (err) {
            console.error("failed to remove: ", err)
        }
    }//✓
    

    const cartOpen= ()=>setIsCartOpen(true);
    const cartClose= ()=>setIsCartOpen(false);
    
    useEffect(()=>{
        if(authCtx.email){
            loadCart(authCtx.email)
        }
    },[authCtx.email]);

    return (
        <CartContext.Provider value={{
            cartList,
            isCartOpen, 
            cartOpen, 
            cartClose, 
            addItemToCart, 
            removeItemToCart,
            loadCart
            }}>
            {children}
        </CartContext.Provider>
    )
}