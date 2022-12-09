import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const emailAccount = account.email;
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login')
    }
    const handleRegisterClick = () => {
        navigate('/register')
    }
    // const handleLogoutClick = async () => {
    //     await postLogout();
    //     navigate('/')
    // }

    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <NavLink to='/' className='navbar-brand'>QUIZ</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>User</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>


                    </Nav>

                    <Nav>
                        {
                            isAuthenticated === false ?
                                <>
                                    <button className='btn-login'
                                        onClick={() => handleLoginClick()}
                                    >Log in
                                    </button>
                                    <button
                                        onClick={() => handleRegisterClick()}
                                        className='btn-signup'
                                    >Sign up</button>
                                </>
                                :
                                <NavDropdown title={`${emailAccount}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item >Log out</NavDropdown.Item>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </NavDropdown>

                        }



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;