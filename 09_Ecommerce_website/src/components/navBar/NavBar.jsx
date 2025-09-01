import { Navbar, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";    
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const {cartOpen, cartList} = useContext(CartContext);
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#" className="fw-semibold">E-Commerce</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto "/>
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto gap-3 text-end" >
                        <NavLink to="/" style={({ isActive }) => ({
                                              textDecoration: "none",
                                              color: "white",
                                              fontWeight: isActive ? "bold" : "normal",
                                            })}><span>Home</span></NavLink>
                        <NavLink to="/store" style={({ isActive }) => ({
                                                textDecoration: "none",
                                                color: "white",
                                                fontWeight: isActive ? "bold" : "normal",
                                              })}><span>Store</span></NavLink>
                        <NavLink to="/about" style={({ isActive }) => ({
                                                textDecoration: "none",
                                                color: "white",
                                                fontWeight: isActive ? "bold" : "normal",
                                              })}><span>About</span></NavLink>
                    </Nav >
                    <div className="ms-auto text-end mt-2 mt-lg-0">
                    <Button variant="light" className="fw-semibold " onClick={cartOpen}>Cart ({cartList.length})</Button>
                    </div>
                </Navbar.Collapse>
           
        </Container>
    </Navbar> 

  )
}

export default NavBar;