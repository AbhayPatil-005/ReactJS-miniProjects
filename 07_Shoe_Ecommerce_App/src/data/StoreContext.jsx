import { createContext, useState } from "react";



const StoreContext = createContext() ; 
const StoreProvider = ({children})=>{
    const [store, setStore] = useState([]);

    const addToStore=(products)=>{ // This should add products when admin adds new product.
        setStore(prev=>[...prev, products])
    }

    const removeFromStore = (productId, size, qty = 1) =>{ // This should remove product's quantity, if user Add products to cart.
        setStore(prevStore =>
        prevStore.map(product =>
            product.id === productId
                ? {...product, quantity: {...product.quantity,
                    [size]: product.quantity[size] - qty
                    }
                }
                : product
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