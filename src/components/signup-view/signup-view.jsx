import "./signup-view.scss"
import { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap"

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://mosfilm-api.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.open("/login", "_self");
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <Form.Group className="mt-1" controlId="formUsername">
              <Form.Label className="mx-2">Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="username must contain 5 characters"
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formPassword">
              <Form.Label className="mx-2">Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="password must contain 8 characters"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formEmail">
              <Form.Label className="mx-2">Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formBirthday">
              <Form.Label className="mx-2">Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mt-3" varient="Primary" bsPrefix="submit-signup" type="submit">Register</Button>
          </Col>
        </Row>
      </Form>
    </Container >
  );
};