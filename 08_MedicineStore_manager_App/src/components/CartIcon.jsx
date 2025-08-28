import { CartContext } from "../data/CartContext";
import { useContext } from "react";

const CartIcon=(props)=>{
    const {cart} = useContext(CartContext);
    return(
        <button onClick={props.onClick} className={props.className}>🛒 Cart [{cart.length}]</button>
    )
}
export default CartIcon;