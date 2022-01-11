import React, { 
    useEffect, 
    useState 
} from 'react';
import { 
    Layout, 
    Inputs 
} from '../../components/common';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {login}  from '../../actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const Signin = (props) => {
  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const auth = useSelector((state) => state.auth);



    const dispatch = useDispatch();

    

    const userLogin =(e)=>{
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if(auth.isAuthenticated){
        return <Redirect to={'/'}/>
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
                                    onChange={(e) => {setEmail(e.target.value)}}

                                />

                                <Inputs
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    errorMessage="Please enter your password"
                                    value={password}
                                    name="password"
                                    onChange={(e) => { setPassword(e.target.value) }}

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
