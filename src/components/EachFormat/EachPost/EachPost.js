import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary'
import heartR from '../../../assets/images/h24R.png'
import heartW from '../../../assets/images/h24W.png'
import retweet from '../../../assets/images/retweet.png'
import share from '../../../assets/images/share.png'
import comment from '../../../assets/images/comment.png'


const eachPost = (props) => {
    const d = props.post.createdAt
    const e = new Date(d)
    const n = e.toDateString()

    let heart = false
    if (props.curUserId in props.post.likedBy) {
        // console.log('yes');
        heart = heartR
    } else {
        // console.log('no');
        heart = heartW
    }

    // console.log('heart value', heart);
    const toggleHeart = () => {
        if (heart === heartW) {
            heart = heartR
            console.log('toggle if', heart);
        } else if (heart === heartR) {
            heart = heartW
            console.log('toggle else', heart);

        }
    }


    // sendData = () => {
    //     this.props.curHeart(heart);
    // }


    // console.log('owner username', props.post.profileowner)
    // console.log('owner type', typeof (props.post.profileowner));
    // console.log('from profile', props.post);
    // console.log('running each post')
    // console.log('the photo', typeof props.post.profileowner[0].profilePic)
    let pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(props.post.pic)} roundedCircle style={{ height: '50px', width: '50px' }} />
    if (props.post.profileowner[0].profilePic !== undefined) {
        pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(props.post.profileowner[0].profilePic)} roundedCircle style={{ height: '50px', width: '50px' }} />
    }

    if (props.from === "timeline") {
        pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(props.timelineProfilePic)} roundedCircle style={{ height: '50px', width: '50px' }} />
    }
    return (
        <Auxiliary>
            {props.userUniversity === props.post.university ?
                <Container fluid style={{ backgroundColor: 'white', marginTop: '15px', paddingTop: '10px' }}>
                    <Row>
                        {/* <p>{props.post._id}</p> */}
                        <Col xs={2}>{pic}</Col>
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
                        <Col xs={7}></Col>
                        <Col xs={1}><Image src={heart} onClick={() => {
                            props.heartClicked(heart)
                            toggleHeart()
                        }} /></Col>
                        <Col xs={1}><Image src={comment} onClick={props.commentClicked} /></Col>
                        {/* <Col xs={1}><Image src={retweet} /></Col> */}
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