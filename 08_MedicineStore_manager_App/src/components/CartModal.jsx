import styles from './CartModal.module.css'
const CartModal=(props)=>{
    return (
        <>
            <div 
                className={styles.backdrop}
                onClick={props.onClose}
                />
            <div
                className={styles.modal}
            >
                <h2 >Your Cart</h2>
                {props.cart.length ===0? (<p>Add items to your Cart</p>):(<ul>
                    {props.cart.map((item)=>(
                    <li key={item.cartId} className={styles.listItem}>
                        <div><span>Product: </span><b>{item.medName}</b> </div>
                        <div><span>Description: </span>{item.description}</div>
                        <div><span>Price: </span>₹.{item.price * item.selectedQuantity}/-</div>
                        <div><span>Quantity: </span>{item.selectedQuantity}</div>
                    </li>
                ))}
                </ul>)}
                <div className={styles.buttonRow}Z>
                    <button onClick={props.onClose} className={styles.closebtn}>Close Cart</button>
                <button className={styles.placebtn}>Place Order!</button>
                </div>
                

            </div>
                
        </>
    )
}
export default CartModal;