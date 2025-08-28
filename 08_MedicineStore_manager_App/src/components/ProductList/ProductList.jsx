import { useContext } from "react";
import { CartContext } from "../../data/CartContext";
import { StoreContext } from "../../data/StoreContext";
import styles from './ProductList.module.css';

const ProductList = () =>{
    const {addToCart} = useContext(CartContext);
    const {store, removeFromStore} = useContext(StoreContext);
    console.log(store)

    const handleAddToCart = (product, selectedQuantity= 1 ) =>{
        if (!product.medName || !product.description || product.price<=0 || selectedQuantity <= 0) {
        alert("Product information is incomplete or quantity is invalid!");
        return;
        }
        const cartItem = {
            ...product,
            selectedQuantity,
            cartId: `${product.id}`
        }
        addToCart(cartItem)
        removeFromStore(product.id, selectedQuantity)
    }
    return(store.length>0 && (<ul className={styles.productList}>
            {store.map((product)=>(
                <li key={product.id} className={styles.productItem}>
                    <div className={styles.left}>
                    <h3 className={styles.productTitle}>{product.medName} <span>({product.quantity} available)</span></h3> 
                    <p className={styles.productDesc}>{product.description}</p> 
                    <p className={styles.productPrice}><span className={styles.p}>Price: </span>₹{product.price}/-</p> 
                        </div>
                        {product.quantity >= 0 && 
                        (<div className={styles.right}> 
                        <button className={styles.addButton} onClick={()=>handleAddToCart(product)}  
                         style={{
                                    backgroundColor: product.quantity > 0 ? "green" : "lightgray",
                                    color: product.quantity > 0 ? "white" : "black",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                disabled={product.quantity <= 0}
                         >
                            Add to Cart
                            </button>
                            </div>)}
                    
                </li>)
                )}
            </ul>))

}
export default ProductList;