import {Container} from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        height: "100px",           
        display: "flex",             
        alignItems: "center",
      }}
      className="bg-info text-white mt-4"
    >
      <Container className="text-start">
        <p className="mb-0 " style={{ fontFamily: "monospace", fontSize: "50px" }}>
          The Generics
        </p>
      </Container>
    </footer>
  );
};

export default Footer;