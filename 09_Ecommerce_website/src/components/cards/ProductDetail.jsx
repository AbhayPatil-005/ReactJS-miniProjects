import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";

import { useParams } from "react-router-dom"
const ProductDetail = ()=>{
    const params = useParams();
    const productsArr = [
        { 
            title: 'Colors', 
            price: 100, 
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
            id: 1
        },
        {
            title: 'Black and white Colors',
            price: 50,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
            id: 2
        },
        {
            title: 'Yellow and Black Colors',
            price: 70,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
            id: 3
        },
        {
            title: 'Blue Color',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
            id: 4
        }]
        const product = productsArr.find(p=>p.id === parseInt(params.id) );
         if(!product) return <h2>Product not found!</h2>
    return (
        <>
        <NavBar/>
            <div className="text-center ">
                <h2>{product.title}</h2>
                <img src={product.imageUrl} alt={product.title} />
                <p>Price: {product.price}</p>
            </div>
            <Footer/>
        </>
    )
}
export default ProductDetail;