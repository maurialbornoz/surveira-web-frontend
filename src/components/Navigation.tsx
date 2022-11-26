import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useAuthDispatch, useAuthState } from "../context/authContext";
import { Link } from "react-router-dom";
const Navigation = () => {
    const user = useAuthState()
    const authDispatch = useAuthDispatch()

    const logout = () => {
        authDispatch({
            type: "logout"
        })
    }

    return ( 
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Survey</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"></Navbar.Toggle>
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        {user.isAuthenticated 
                        ? (
                            <NavDropdown title={user.email} id="navbar-dropdown">
                                <NavDropdown.Item as={Link} to="/user">My surveys</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                                <Nav.Link as={Link} to="/register">Create Account</Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Navigation;