import { CartContext } from "../../context/CartContext";
import { useContext} from "react";
import { Offcanvas, ListGroup, Button} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";


export const Cart=()=>{
    const {cartClose, isCartOpen, 
        removeItemToCart, cartList} = useContext(CartContext);
        const authCtx = useContext(AuthContext);
    const cartElements = [{
                            title: 'Colors',
                            price: 100,
                            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
                            quantity: 2,
                            },
                            {
                            title: 'Black and white Colors',
                            price: 50,
                            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
                            quantity: 3,
                            },
                            {
                            title: 'Yellow and Black Colors',
                            price: 70,
                            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
                            quantity: 1,
                            }]
    
    let total = 0;
    cartList.forEach((product) => {
                total += product.price * product.quantity;
                });
                    
    
    return(
    <>

    <Offcanvas 
    show={isCartOpen}
    onHide={cartClose}
    placement="end"
    backdrop={true}
    scroll={false}>
        <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title >Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup variant="flush">
                
                {cartList.map((product, index)=>(
                <ListGroup.Item key={index+1} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <span className="me-2 fw-bold">{index + 1}.</span>
                        <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="img-fluid rounded me-2" 
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                                <div className="fw-bold">{product.title}</div>
                                <div className="text-muted">₹{product.price}</div>
                            </div>
                    </div>
                    
                <div className="d-flex align-items-center">
                        <span className="border rounded px-2 py-1 me-3 bg-light">Qty: {product.quantity}</span>
                        <Button variant="danger" size="sm" onClick={()=>removeItemToCart(product, authCtx.email)}>Remove</Button>

                </div>
                </ListGroup.Item>))}
            </ListGroup>
        </Offcanvas.Body>
            <div className="d-flex justify-content-between p-3 border-top mt-auto">
                <div><b>Total: </b>₹{total}</div>
                <Button className="btn-success">Purchase</Button>
            </div>
    </Offcanvas>
    </>
    
    )
}
