// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
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
                    <Nav className="me-auto"></Nav>
                    <Nav className="justify-content-end">
                        {user.isAuthenticated 
                        

                        ? (
                            <>
                                <Nav.Link as={Link} to="/create_poll">Create Survey</Nav.Link>
                                <NavDropdown title={user.email} id="navbar-dropdown">
                                    <NavDropdown.Item as={Link} to="/user">My surveys</NavDropdown.Item>
                                    <NavDropdown.Divider></NavDropdown.Divider>
                                    <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>

                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/">Log In</Nav.Link>
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