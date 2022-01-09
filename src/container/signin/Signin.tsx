import React, { useEffect, useState } from 'react';
import { Layout, Inputs } from '../../components/common';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {isUserLoggedIn, login}  from '../../actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Signin = (props:any) => {
  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState();


    const auth = useSelector((state:any) => state.auth);



    const dispatch = useDispatch();

    useEffect(() => {
        (!auth.isAuthenticated) && dispatch(isUserLoggedIn());
    }, [auth.isAuthenticated]);
    

    const userLogin =(e:any)=>{
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if(auth.isAuthenticated){
        return <Navigate to={'/'}/>
    }

    
    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{
                        marginTop: '50px'
                    }}>
                        <Col md={{
                            span: 6,
                            offset: 3
                        }}>
                            <Form onSubmit={userLogin}>
                                <Inputs
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    errorMessage="Please enter your email"
                                    value={email}
                                    name="email"
                                    onChange={(e:any) => {setEmail(e.target.value)}}

                                />

                                <Inputs
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    errorMessage="Please enter your password"
                                    value={password}
                                    name="password"
                                    onChange={(e:any) => { setPassword(e.target.value) }}

                                />

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default Signin
