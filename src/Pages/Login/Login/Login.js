
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Nav, Row, Spinner } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hook/useAuth';
import Navigation from '../../../Shared/Navigation/Navigation';
import login from '../../../images/login.jpg'
import google from '../../../images/google.png'

const Login = () => {
    const [loginData, setLoginData] = useState('');
    const history = useHistory();
    const location = useLocation();
    const { user, isLoading, error, loginUser, signInWithGoogle } = useAuth();
    console.log('logindata=',loginData);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log('value',value);
        const newLoginData = { ...loginData };

        newLoginData[field] = value;
        setLoginData(newLoginData);


    }
    const handleLogInSubmit = e => {
        loginUser(loginData?.email, loginData?.password, location, history)
        e.preventDefault();
    }
    return (
        <div>
            <Navigation></Navigation>
            <Container>

                <Row xs={1} md={2}>

                    <Col >
                        <img className='img-fluid' src={login}>

                        </img>
                    </Col>
                    <Col className='mt-md-5 pt-md-5'>

                        {isLoading && <>
                            <Button className='my-5' variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </Button>{' '}
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                        </>}

                        <h2>Please Login</h2>
                        <p className=" mt-2">Login with Email & Password</p>
                        <p className="text-danger text-center"></p>
                        <p className="text-danger text-center">{error}</p>

                        {/* <form onSubmit={handleLogInSubmit}>

                <input
                    className='my-2 w-75 p-2'
                    type='email'
                    name='email'
                    placeholder='your email'
                    onBlur={handleOnBlur}
                ></input><br />
                <input
                    className='my-2 w-75 p-2'
                    type='password'
                    placeholder='password'
                    name='password'
                    onBlur={handleOnBlur}
                ></input><br />

                <input
                    type='submit'
                    value='Submit'
                >
                </input>
            </form> */}

                        <Form
                            onSubmit={handleLogInSubmit}
                        >
                            <Row>
                                <Col className="text-start">
                                    <Form.Label htmlFor="email" visuallyHidden>
                                        Your Email Address
                                    </Form.Label>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                        </InputGroup.Text>
                                        <FormControl
                                            onBlur={handleOnBlur}
                                            type="email"
                                            name='email'
                                            autoComplete="current-email"
                                            id="email"
                                            placeholder="Enter your email address"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="text-start">
                                    <Form.Label htmlFor="password" visuallyHidden>
                                        Your Password
                                    </Form.Label>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                        </InputGroup.Text>
                                        <FormControl
                                            onBlur={handleOnBlur}
                                            type="password"
                                            name='password'
                                            autoComplete="current-password"
                                            id="password"
                                            placeholder="Enter your password"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>

                            <button type="submit" className="btn btn-primary mt-2 w-100">
                                Login
                            </button>
                        </Form>
                        <p>
                            --------------------------------

                        </p>
                        <Nav.Link className='text-dark' as={NavLink} to='/register'>Already have an account? please login</Nav.Link>
                        <p>SignUp with google</p>
                        <Button className="text-warning" style={{backgroundColor:'#f1f1f1'}}  onClick={() => signInWithGoogle(location, history)}>SignUp With <img src={google} width="46px" alt="google-icon" /></Button>
                        {user?.email && <Alert variant='success' className='w-25 mx-auto ' >
                            Login successfully
                        </Alert>}



                    </Col>


                </Row>

            </Container>
        </div>
    );
};

export default Login;