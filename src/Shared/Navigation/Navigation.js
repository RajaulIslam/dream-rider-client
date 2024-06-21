import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import logo from '../../images/logo.jpg'


const Navigation = () => {
    const { user, logout } = useAuth();
    return (
        <Navbar className='header' style={{backgroundColor:"#e9e7f5"}} expand="lg">
            <Container >
                <Navbar.Brand className='' as={NavLink} to='/home'>
                    <img
                        alt=""
                        src={logo}
                        width="150"
                        height="70"
                        className="d-inline-block align-top"
                    />{''}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='fw-bold' as={NavLink} to='/home'>Home</Nav.Link>
                        <Nav.Link className='fw-bold' as={NavLink} to='/bikes'>Bikes</Nav.Link>
                       
                        <>
                            {
                                user.displayName ?
                                    <>
                                        <Nav.Link className='fw-bold' onClick={logout}> hi! {user.displayName} {" "}Logout</Nav.Link>
                                        <Nav.Link className='fw-bold' as={NavLink} to='/dashboard'>Dashboard</Nav.Link>



                                    </>




                                    :


                                    <>

                                        <Nav.Link className='fw-bold ' as={NavLink} to='/register'>Register</Nav.Link>
                                        <Nav.Link className='fw-bold' as={NavLink} to='/login'>Login</Nav.Link>



                                    </>
                            }
                        </>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;