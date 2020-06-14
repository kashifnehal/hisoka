import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classes from './Toolbar.css'
// import Logo from '../Logo/Logo'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Container fluid className="shadow" >
                    <Row style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Col sm={3} style={{ border:'red 1px solid', display:'flex',alignItems:'center'}}>
                            {/* <Logo /> */}<h1 style={{color:'white'}}>LOGO</h1>
                             SEARCH BAR
                        </Col>
                        <Col xs={12} sm={6} style={{ border:'grey 1px solid', display:'flex', justifyContent:'space-around'}}>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                        </Col>
                        <Col sm={3} style={{ border:'green 1px solid'}}>
                            right
                        </Col>
                    </Row>
                </Container>
        </header>
    )
}

export default toolbar