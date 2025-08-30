import { Navbar, Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";    

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#" className="fw-semibold">E-Commerce</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto "/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" >
                        <Nav.Link href="#home" className="text-white fw-semibold ">Home</Nav.Link>
                        <Nav.Link href="#home" className="text-white fw-semibold ">Store</Nav.Link>
                        <Nav.Link href="#home" className="text-white fw-semibold ">About</Nav.Link>
                    </Nav>
                    <Button variant="light" className="fw-semibold ms-auto">Cart</Button>
                </Navbar.Collapse>
           
        </Container>
    </Navbar> 

  )
}

export default NavBar;