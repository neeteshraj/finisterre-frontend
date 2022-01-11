import React from 'react';
import { 
    Nav, 
    Navbar, 
    Container 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import {
    useSelector, 
    useDispatch
} from 'react-redux';
import { signOut } from '../../../actions';


const Header = (props) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(signOut());
    }



    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Sign out</span>
                </li>
            </Nav>
        )
    }
    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <Link to="/signin" className="nav-link">Sign in</Link>
                </li>

                <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign up</Link>
                </li>
            </Nav>
        )
    }
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
                <Container fluid>
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
                        {auth.isAuthenticated ? renderLoggedInLinks():renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header;
