import { createContext, useState } from "react";

const StoreContext = createContext() ; 

const StoreProvider = ({children})=>{
    const [store, setStore] = useState([]);

    const addToStore=(products)=>{ 
        setStore(prev=>[...prev, products])
    }

    const removeFromStore = (productId, qty = 1) =>{ 
        setStore(prevStore =>prevStore.map(
            product =>product.id === productId ? { ...product, quantity: product.quantity - qty } : product
            )
        );
    }
    return(
        <StoreContext.Provider value={{store, addToStore, removeFromStore}}>
            {children}
        </StoreContext.Provider>
    )
}
export { StoreContext, StoreProvider };