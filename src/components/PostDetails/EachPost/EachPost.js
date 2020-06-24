import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const eachPost = (props) => {
    // console.log(props.post.media)
    return( 
        <Container fluid style={{backgroundColor:'white', marginTop:'15px',paddingTop:'10px'}}>
            <Row>
                <Col xs={2}><Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{height:'50px', width:'50px'}}/></Col>
                <Col xs={10} >
                    <Row >
                        <Col><b>{props.post.name}</b></Col>
                    </Row>
                    <Row>
                        <Col><i>{props.post.date}</i></Col>
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
                <Col xs={12}><p>likes {props.post.likes}</p></Col>
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