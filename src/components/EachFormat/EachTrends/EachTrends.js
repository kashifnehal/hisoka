import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary'


const eachTrends = (props) => {
    const d = props.post.createdAt
    const e = new Date(d)
    const n = e.toDateString()


    // console.log('owner username', props.post.profileowner)
    // console.log('owner type', typeof (props.post.profileowner));

    return (
        <Auxiliary>
            {props.post.postPrivacy === "public" ?
                <Container fluid style={{ marginTop: '15px', paddingTop: '10px' }}>
                    <Col lg={2}> </Col>
                    <Col xs={12} sm={9} md={6} lg={5} style={{ backgroundColor: 'white' }}>
                        <Row>
                            <Col xs={2}><Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{ height: '50px', width: '50px' }} /></Col>
                            <Col xs={10} >
                                <Row >
                                    <Col><b>{props.post.username}</b></Col>
                                </Row>
                                <Row>
                                    <Col><p><i>{n}</i></p></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}><p>{props.post.caption}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={12}><Image src={process.env.PUBLIC_URL + '/images/' + String(props.post.media)} alt='no image' fluid /></Col>
                        </Row>
                        <Row>
                            <Col xs={6}><p>likes {props.post.likes}</p></Col>
                            <Col xs={6}><button onClick={props.callComment}>comments</button></Col>
                        </Row></Col>
                    <Col md={3} lg={2}> </Col>

                </Container> : null}

        </Auxiliary>
    )
}

export default eachTrends