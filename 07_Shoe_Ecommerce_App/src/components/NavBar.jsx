import { useContext, useState } from "react";
import { CartContext } from "../data/CartContext";
import CartIcon from "./CartIcon";
import CartModal from "./CartModal";


const NavBar=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const {cart} = useContext(CartContext);

    return(
    <header>
        <h1>Welcome to ShoeKart</h1>

        <CartIcon 
        onClick={()=>setIsOpen(true)}>
            Your Cart
        </CartIcon>
        {isOpen && <CartModal cart={cart} onClose={()=>setIsOpen(false)}/>}
    </header>
    )
}

export default NavBar;