import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
const Cards = () => {
    const productsArr = [
        { 
        title: 'Colors', 
        price: 100, 
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        },
        {
            title: 'Black and white Colors',
            price: 50,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        },
        {
        title: 'Yellow and Black Colors',
        price: 70,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        },
        {
        title: 'Blue Color',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
        }]
  return (
    <> 
        <Container className="mt-4">
            <Row className="justify-content-center">
        {productsArr.map((product, index)=>(
            <Col md={6} lg={6} key={index} className="mb-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }}>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Img variant="top" src={product.imageUrl} />
                        <Card.Body>
                        <div className="d-flex align-items-center">
                            <Card.Text className="me-auto">
                            ${product.price}
                            </Card.Text>
                            <Button variant="primary" className="ms-auto">Add to cart</Button>
                        </div>
                    </Card.Body>
                    </Card>
            </Col>
        ))}
           </Row>
           <div className="text-center mt-3">
                <Button variant="primary">See Cart</Button>
            </div>
        </Container>
        
    </>
  )
}
export default Cards;