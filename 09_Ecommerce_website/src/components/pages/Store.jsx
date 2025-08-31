import NavBar from "../navBar/NavBar";
import Header from "../header/Header";
import Cards from "../cards/Cards";
import { Cart } from "../cart/Cart";
import Footer from "../footer/Footer";

export const Store=()=>{
    return(<>
        <NavBar/>    
        <Header/>
        <Cards/>
        <Cart/>
        <Footer/>
    </>)
}