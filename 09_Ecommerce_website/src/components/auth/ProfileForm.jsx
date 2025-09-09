import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,   
            password: enteredPassword, 
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Password update failed!");
      }

      console.log("Password updated successfully!", data);

      newPasswordInputRef.current.value = "";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
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
  );
};

export default ProfileForm;
