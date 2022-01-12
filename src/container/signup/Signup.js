import React,{useEffect, useState} from 'react'
import { Inputs, Layout } from '../../components/common';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import signUp from '../../actions/user-actions';

const Signup = (props) => {

    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");


    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);


    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user.loading){
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }
    },[user.loading])
    
    const userSignUp=(e)=>{

        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password
        };
        dispatch(signUp(user));
    };

    if(auth.isAuthenticated){
        return <Redirect to={`/`}/>
    }

    if(user.loading){
    return (
        <div>
            <p>
                Loading...
            </p>
        </div>
    )
    }

    return (

            <Layout>
                <Container>
                    {user.message}
                    <Row style={{
                        marginTop: '50px'
                    }}>
                        <Col md={{
                            span: 6,
                            offset: 3
                        }}>
                            <Form onSubmit={userSignUp}>
                                <Row>
                                    <Col md={6}>
                                        <Inputs
                                            label="First Name"
                                            placeholder="First Name"
                                            type="text"
                                            errorMessage="Please enter your first name"
                                            value={firstName}
                                            onChange={(e) => {setFirstName(e.target.value)}}

                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Inputs
                                            label="Last Name"
                                            placeholder="Last Name"
                                            type="text"
                                            errorMessage="Please enter your first name"
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value) }}

                                        />
                                    </Col>
                                </Row>
                                <Inputs
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    errorMessage="Please enter your email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}

                                />

                                <Inputs
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    errorMessage="Please enter your password"
                                    value={password}
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

    )
}

export default Signup;
