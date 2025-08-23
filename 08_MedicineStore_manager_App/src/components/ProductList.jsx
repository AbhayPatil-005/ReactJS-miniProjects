import { useContext } from "react";
import { CartContext } from "../data/CartContext";
import { StoreContext } from "../data/StoreContext";

const ProductList = () =>{
    const {addToCart} = useContext(CartContext);
    const {store, removeFromStore} = useContext(StoreContext);

    const handleAddToCart = (product, selectedQuantity= 1 ) =>{
        const cartItem = {
            ...product,
            selectedQuantity,
            cartId: `${product.id}`
        }
        addToCart(cartItem)
        removeFromStore(product.id, selectedQuantity)
    }
    return(<ul>
            {store.map((product)=>(
                <li key={product.id} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: "1rem", 
                        borderBottom: "1px solid #ddd" 
                        }}>
                    <div>
                    <h2>Medicine name: {product.medName}</h2> 
                    <p style={{fontStyle:"italic"}}>{product.description}</p> 
                    <p>Price: ₹.{product.price}/-</p> 
                        {product.quantity >= 0 && 
                        (<button onClick={()=>handleAddToCart(product)}  
                         style={{
                                    backgroundColor: product.quantity > 0 ? "green" : "lightgray",
                                    color: product.quantity > 0 ? "white" : "black",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                disabled={product.quantity <= 0}
                         >
                            Add to Cart({product.quantity})
                            </button>)}
                    </div>
                </li>)
                )}
    </ul>
    )

}
export default ProductList;