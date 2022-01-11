import React from 'react'
import { Layout } from '../../components/common';
import { Row, Col, Container } from 'react-bootstrap';
import './Home.css'



const Home=(props) =>{



    return (
        <div>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">Side bar</Col>
                        <Col md={10} style={{marginLeft:'auto'}}>Container</Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default Home;
