import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary'


const eachPost = (props) => {
    const d = props.post.createdAt
    const e = new Date(d)
    const n = e.toDateString()
    // console.log(d)
    // console.log(e)
    // console.log(n)
    // console.log(props.post._id)


    // const d = new Date(props.post.createdAt);
    // const n = d.toDateString();
    // console.log(n);
    // console.log(props.post.media)

    // console.log('asgds')

    // console.log('owner username', props.post.profileowner.username)
    return (
        <Auxiliary>
            {props.userUniversity === props.post.university ?
                <Container fluid style={{ backgroundColor: 'white', marginTop: '15px', paddingTop: '10px' }}>
                    <Row>
                        {/* <p>{props.post._id}</p> */}
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
                    </Row>

                </Container>
                : null}
        </Auxiliary>
    )
}

export default eachPost