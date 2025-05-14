import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import './navigation-bar.scss';
/*import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";*/
import favicon from '../../img/logo.png';

export const NavigationBar = ({ user, onLoggedOut }) => {
  /*const user = useSelector((state) => state.user);*/
  /*const dispatch = useDispatch();*/

  return (
    <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Will and Maple Logo"
            src={favicon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Доброе день
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login User
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`/user/${encodeURIComponent(user.Username)}`}>User Menu</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}