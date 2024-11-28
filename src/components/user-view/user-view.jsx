import { useEffect, useState } from 'react';
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router";
import './user-view.scss';

export const UserView = ({ movies, user, token }) => {
  console.log({ user });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateParams = user.Username;
  const defaultUsername = user.Username;
  const defualtEmail = user.Email;
  const [username, setUsername] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstPassword === secondPassword) {
      setPassword(firstPassword)
    } else {
      return (alert("Passwords do not Match!"))
    };

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://mosfilm-api.onrender.com/users/${updateParams}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  return (<div>
    <div>
      User: {user.Username} --- Email: {user.Email} --- Birthday: {user.Birthday}
    </div>
    <Button variety="primary" onClick={handleShow}>Update User Details</Button>
    <Link to={`/`}>
      <Button className="back-button">Back</Button>
    </Link>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              defaultValue={defaultUsername}
              placeholder={defaultUsername}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={firstPassword}
              onChange={(e) => setFirstPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Retype Password:</Form.Label>
            <Form.Control
              type="password"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              defaultValue={defualtEmail}
              placeholder={defualtEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button varient="Primary" bsPrefix="submit-signup" type="submit">Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button varient="primary" onClick={handleClose}>Exit</Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
};