import React from 'react'
import { Layout, Inputs } from '../../components/common';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import login  from '../../actions/auth-actions';
import { useDispatch } from 'react-redux';


const Signin = (props:any) => {
    
    const dispatch = useDispatch();

    const userLogin =(e:any)=>{
        e.preventDefault();
        const user = {
            email: 'nitesh.khanal19@gmail.com',
            password: 'HelloWorld'
        }
        dispatch(login(user));
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
                                    value=""
                                    onChange={() => { }}

                                />

                                <Inputs
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    errorMessage="Please enter your password"
                                    value=""
                                    onChange={() => { }}

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
