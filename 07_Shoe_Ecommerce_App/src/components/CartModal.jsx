const CartModal=(props)=>{
    return (
        <>
            <div 
                className="backdrop"
                onClick={props.onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 100,
                }}
                />
            <div
                className="modal"
                style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                zIndex: 101,
                maxWidth: "700px",
                width: "90%",
                }}
            >
                <h2>Your Cart</h2>
                {props.cart.length ===0? (<p>Add items to your Cart</p>):(<ul>
                    {props.cart.map((item)=>(
                    <li key={item.cartId}>
                        {`Product: ${item.shoeName} 
                        -> Price: ₹${item.price * item.selectedQuantity} 
                        -> Size: ${item.selectedSize.toUpperCase()} 
                        -> Quantity: ${item.selectedQuantity}`}
                    </li>
                ))}
                </ul>)}
                <button onClick={props.onClose}>Close Cart</button>
                <button >Place Order!</button>

            </div>
                
        </>
    )
}
export default CartModal;