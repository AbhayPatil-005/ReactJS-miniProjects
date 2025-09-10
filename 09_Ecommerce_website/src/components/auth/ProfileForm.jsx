import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import NavBar from "../navBar/NavBar";  


const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;
    console.log(enteredPassword)
   
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,   
            newPassword: enteredPassword, 
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );console.log(response)

      const data = await response.json();
      authCtx.login(data.idToken);
      console.log(data)

      if (!response.ok) {
        throw new Error(data.error.message || "Password update failed!");
      }
      console.log(enteredPassword)
      alert("Password updated successfully! Please log in again with your new password.");
      authCtx.logout();  
      history.replace("/login");

      newPasswordInputRef.current.value = "";
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (<>
  <NavBar/>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h3 className="mb-4 text-center">Update Password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                ref={newPasswordInputRef}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update Password
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  </>);
};

export default ProfileForm;
