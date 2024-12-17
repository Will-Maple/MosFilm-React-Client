import "./login-view.scss"
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
/*import { useSelector, useDispatch } from "react-redux";*/


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://mosfilm-api.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
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
                placeholder="enter username"
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
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" bsPrefix="submit-login" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};