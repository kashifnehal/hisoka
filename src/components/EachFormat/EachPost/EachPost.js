import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary'
import heartR from '../../../assets/images/h24R.png'
import heartW from '../../../assets/images/h24W.png'
import share from '../../../assets/images/share.png'
import comment from '../../../assets/images/comment.png'


const eachPost = (props) => {
    const d = props.post.createdAt
    const e = new Date(d)
    const n = e.toDateString()

    let heart = heartW
    if (props.heart === "red") {
        heart = heartR
    } else if (props.heart === "white") {
        heart = heartW
    }


    // console.log('owner username', props.post.profileowner)
    // console.log('owner type', typeof (props.post.profileowner));
    // console.log('from profile', props.post);

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
                        <Col xs={12}>{props.post.media === "" ? null : <Image src={process.env.PUBLIC_URL + '/images/' + String(props.post.media)} alt='no image' fluid />}</Col>
                    </Row>
                    <Row>
                        <Col xs={8}></Col>
                        <Col xs={1}><Image src={heart} onClick={props.heartClicked} /></Col>
                        <Col xs={1}><Image src={comment} onClick={props.commentClicked} /></Col>
                        <Col xs={1}><Image src={share} onClick={props.shareClicked} /></Col>
                        {/* <Col xs={1}><p>{props.post.likes}</p></Col>
                        <Col xs={1}><button onClick={props.callComment}>comments</button></Col> */}
                    </Row>

                </Container>
                : null}
        </Auxiliary>
    )
}

export default eachPost