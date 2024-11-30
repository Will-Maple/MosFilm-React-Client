import { useEffect, useState } from 'react';
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router";
import './user-delete.scss'

export const UserDelete = ({ user, token, onLoggedOut }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");

  const initiateDelete = () => {
    fetch(`https://mosfilm-api.onrender.com/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Delete was Successful!")
        onLoggedOut();
      }
    }
    );
  }

  const data = {
    Username: username,
    Password: password
  };

  const handleDelete = (event) => {
    event.preventDefault();

    fetch("https://mosfilm-api.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.user) {
          initiateDelete();
        } else {
          alert("No such user")
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (<div>
    <Button variety="primary" bsPrefix='utility' onClick={handleDeleteShow}>Delete User</Button>
    <Link to={`/`}>
      <Button className="back-button" bsPrefix='utility' style={{ float: 'right' }}>Back</Button>
    </Link>

    <Modal show={showDelete} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
        <Modal.Title>Do You Want To Delete This User?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleDelete}>
          <Form.Group controlId="formPassword">
            <Form.Label className="mx-2">Re-Enter Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button varient="Primary" bsPrefix="delete" type="submit">Delete User?</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button varient="primary" onClick={handleDeleteClose} bsPrefix="utility" style={{ float: 'right' }}>Exit</Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
};