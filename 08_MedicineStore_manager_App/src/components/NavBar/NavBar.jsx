import { useContext, useState } from "react";
import { CartContext } from "../../data/CartContext";
import CartIcon from "../CartIcon";
import CartModal from "../CartModal";
import styles from './NavBar.module.css';


const NavBar=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const {cart} = useContext(CartContext);

    return(
        <>
    <header className={styles.navBar}>
        <h1> + Welcome to Medicine Store + </h1>

        <CartIcon className={styles.cartIcon}
        onClick={()=>setIsOpen(true)}>
            Your Cart
        </CartIcon>
        </header>
        {isOpen && <CartModal cart={cart} onClose={()=>setIsOpen(false)}/>}
            {console.log("isOpen:", isOpen, "cart:", cart)}
    </>);
    
}

export default NavBar;