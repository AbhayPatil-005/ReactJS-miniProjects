import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import { Container, Button, Row, Col } from "react-bootstrap";

const Home =()=>{
    const shows = [
    { date: "JUL 16", city: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
    { date: "JUL 19", city: "TORONTO, ON", venue: "BUDWEISER STAGE" },
    { date: "JUL 22", city: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
    { date: "JUL 29", city: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
    { date: "AUG 2", city: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
    { date: "AUG 7", city: "CONCORD, CA", venue: "CONCORD PAVILION" },
  ];
    return (
    <>
        <NavBar/>
        <div className="text-center bg-secondary text-white py-5">
        <h1 className="display-4 fw-bold">The Generics</h1>
        <Button variant="outline-info" className="mt-3">
          Get our Latest Album
        </Button>
        <div className="mt-4">
          <Button
            variant="outline-info"
            style={{ borderRadius: "50%", padding: "20px 25px" }}
          >
            ▷
          </Button>
            </div>
        </div>
        <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold">TOURS</h2>
        {shows.map((show, index) => (
          <Row
            key={index}
            className="align-items-center border-bottom py-2"
          >
            <Col xs={3} md={2} className="fw-bold">{show.date}</Col>
            <Col xs={4} md={3}>{show.city}</Col>
            <Col xs={3} md={5}>{show.venue}</Col>
            <Col xs={2} md={2} className="text-end">
              <Button variant="info" className="text-white">
                BUY TICKETS
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
        <Footer/>
    </>
    )
} 
export default Home;