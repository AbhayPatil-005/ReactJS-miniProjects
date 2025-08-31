import { CartContext } from "../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { Offcanvas, Container, Row, Col, Button } from "react-bootstrap";

export const Cart=()=>{
    const {cartClose, isCartOpen} = useContext(CartContext);
 
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
    cartElements.forEach((product) => {
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
            <Row className="text-center fw-bold">
                <Col >SL</Col>
                <Col >Item</Col>
                <Col>Price</Col>
                <Col >Quantity</Col>
                <Col ></Col>
            </Row>
            {cartElements.map((product, index)=>(
            <Row key={index} className="text-center">
                <Col >{index +1 }.</Col>
                <Col >{product.title}</Col>
                <Col >{product.price}</Col>
                <Col >{product.quantity}</Col>
                <Col><Button className="btn-danger btn-sm py-1 mb-2" >Remove</Button></Col>
            </Row>))}
        </Offcanvas.Body>
            <div className="d-flex justify-content-between p-3 border-top mt-auto">
                <div><p><b>Total: </b>₹{total}</p></div>
                <Button className="btn-success">Purchase</Button>
            </div>
    </Offcanvas>
    </>
    
    )
}
