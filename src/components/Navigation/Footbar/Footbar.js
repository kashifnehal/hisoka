import React from 'react'
import classes from './Footbar.css'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Home from '../../../assets/images/home.png'
import chat from '../../../assets/images/chat.png'
import search from '../../../assets/images/search.png'
import community from '../../../assets/images/community.png'
import notification from '../../../assets/images/notification.png'


const footbar = (props) => {
    return (
        <footer className={classes.Footbar} style={{ borderTop: 'solid 1.3px grey' }}>
            <Container>
                <Row>
                    <Col><Image src={Home} onClick={props.changeToHome} /></Col>
                    <Col><Image src={search} onClick={props.changeToSearch} /></Col>
                    <Col><Image src={community} onClick={props.changeToComTrends} /></Col>
                    <Col><Image src={notification} onClick={props.changeToNotification} /></Col>
                    <Col><Image src={chat} onClick={props.changeToChat} /></Col>
                </Row>
            </Container>
        </footer >
    )
}

export default footbar