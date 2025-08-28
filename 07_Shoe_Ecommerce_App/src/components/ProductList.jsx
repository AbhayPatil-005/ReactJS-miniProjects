import { useContext } from "react";
import { CartContext } from "../data/CartContext";
import { StoreContext } from "../data/StoreContext";

const ProductList = () =>{
    const {addToCart} = useContext(CartContext);
    const {store, removeFromStore} = useContext(StoreContext);

    const handleAddToCart = (product, selectedSize, selectedQuantity= 1 ) =>{
        const cartItem = {
            ...product,
            selectedSize,
            selectedQuantity,
            cartId: `${product.id}-${selectedSize}`
        }
        addToCart(cartItem)
        removeFromStore(product.id, selectedSize, selectedQuantity)
    }
    return(<ul>
            {store.map((product)=>(
                <li key={product.id}>
                    <h2>{product.shoeName}</h2>
                    <p>{product.description}</p>
                    <h3>Price: {product.price}</h3>
                    
                    <div>
                        {product.quantity.small > 0 && 
                        (<button onClick={()=>handleAddToCart(product, 'small')}>
                            Add Small Size({product.quantity.small})
                            </button>)}
                        
                        {product.quantity.medium>0 && 
                        (<button onClick={()=>handleAddToCart(product, 'medium')}>
                            Add Medium Size({product.quantity.medium})</button>)}

                        {product.quantity.large>0 && 
                        (<button onClick={()=>handleAddToCart(product, 'large')}>
                            Add Large Size({product.quantity.large})
                            </button>)}
                    </div>
                </li>)
                )}
    </ul>
    )

}
export default ProductList;