import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'


const eachPost = (props) => {
    const d = props.post.createdAt
    const e = new Date(d)
    const n = e.toDateString()
    // console.log(d)
    // console.log(e)
    // console.log(n)
    console.log(props.post._id)


    // const d = new Date(props.post.createdAt);
    // const n = d.toDateString();
    // console.log(n);
    // console.log(props.post.media)
    return( 
        <Container fluid style={{backgroundColor:'white', marginTop:'15px',paddingTop:'10px'}}>
            <Row>
                <p>{props.post._id}</p>
                <Col xs={2}><Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{height:'50px', width:'50px'}}/></Col>
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
        // <div>
        //     <Image src={process.env.PUBLIC_URL + '/images/default.png'} alt='no image' style={{height:'50px',width:'50px'}} />
        //     <h3>{props.post.name}</h3>
        //     <h5>{props.post.date}</h5>
        //     <h5>{props.post.caption}</h5>
        //     <Image src={process.env.PUBLIC_URL + '/images/' + String(props.post.media)} alt='no image' style={{height:'300px',width:'500px'}} />
        //     <h4>{props.post.likes}</h4>
        // </div>
    )
}

export default eachPost