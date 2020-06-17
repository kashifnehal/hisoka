import React from 'react'
// import  classes from './ProfileNav.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const profileNav = (props) => {
    return (
        <div >
            <Container>
                <Row>
                    <Col sm={4} style={{border:'red 1px solid'}}><ion-icon name="home-outline" size="large"></ion-icon></Col>
                    <Col lg={6} className="d-none d-lg-block" style={{border:'green 1px solid'}}><p>Kashifnehal</p></Col>
                </Row>
            </Container>
        </div>
    )
}

export default profileNav