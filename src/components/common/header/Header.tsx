import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import './Header.css';


const Header = (props: any) => {
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">Sign in</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign up</Link>
                            </li>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header;
