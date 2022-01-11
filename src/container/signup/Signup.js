import React from 'react'
import { Inputs, Layout } from '../../components/common';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
const Signup = (props) => {
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
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Inputs
                                            label="First Name"
                                            placeholder="First Name"
                                            type="text"
                                            errorMessage="Please enter your first name"
                                            value=""
                                            onChange={() => { }}

                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Inputs
                                            label="Last Name"
                                            placeholder="Last Name"
                                            type="text"
                                            errorMessage="Please enter your first name"
                                            value=""
                                            onChange={() => { }}

                                        />
                                    </Col>
                                </Row>
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

export default Signup;
