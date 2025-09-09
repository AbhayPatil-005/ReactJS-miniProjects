import { Navbar, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";    
import { CartContext } from "../../context/CartContext";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logout = authCtx.logout;

  const {cartOpen, cartList} = useContext(CartContext);

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={NavLink} to='/' className="fw-semibold">E-Commerce</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
                    <Nav className="d-flex  gap-3 text-end me-auto" >                        
                        {isLoggedIn && <><NavLink to="/" activeClassName="fw-bold " className=" text-white text-decoration-none" exact> 
                        <span>Home</span>   
                        </NavLink>

                        <NavLink to="/store" activeClassName="fw-bold" className="text-white text-decoration-none" exact>
                        <span>Store</span>
                        </NavLink>

                        <NavLink to="/about" activeClassName="fw-bold" className="text-white text-decoration-none" exact
                        ><span>About</span>
                        </NavLink>

                        <NavLink to='/contact-us' activeClassName="fw-bold" className="text-white text-decoration-none" exact>
                        <span>Contact Us</span>
                        </NavLink></>}
                    </Nav >
                    <div className=" text-end mt-2 mt-lg-0">
                      {!isLoggedIn &&
                        <NavLink to="/login" activeClassName="fw-bold " className=" text-white text-decoration-none" exact> 
                        <span>Login</span>   
                        </NavLink>
                        }
                    {isLoggedIn && <>
                    <Button variant="light" className="fw-semibold ms-auto" onClick={cartOpen}>Cart ({cartList.length})</Button>
                    <Button variant="danger" className="m-2 " onClick={logout}>Logout</Button>
                    </>}
                    </div>
                </Navbar.Collapse>
           
        </Container>
    </Navbar> 

  )
}

export default NavBar;