import React from 'react';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const eachComment = (props) => {
    const d = props.comment.createdAt
    const e = new Date(d)
    const n = e.toDateString()
    return (
        <Container fluid style={{ backgroundColor: 'white', marginTop: '15px', paddingTop: '10px' }}>
            <Row>
                <Col xs={2}><Image src={process.env.PUBLIC_URL + '/images/' + String(props.comment.pic)} roundedCircle style={{ height: '50px', width: '50px' }} /></Col>
                <Col xs={10}>
                    <Row>
                        <Col><b>{props.comment.username}</b></Col>
                    </Row>
                    <Row>
                        <Col>{props.comment.text}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>Likes:{props.comment.likes}</Col>
                        <Col xs={6}>{props.comment.n}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default eachComment;
