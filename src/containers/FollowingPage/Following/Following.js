import React , {Component} from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import classes from './Following.css'
import WriteImage from '../../../assets/images/2.jpg'
class Following extends Component {
    render () {
        return (
            <Auxiliary className={classes.Write}>
                <Container className={classes.WriteContainer} fluid style={{backgroundColor:'white'}}>
                    <Row className={classes.WriteRow}>
                        {/* <Col className={classes.WritePic} xs={2} style={{border:'red 1px solid',height:'150px'}}><Image src={WriteImage} roundedCircle style={{height:'50px', width:'50px'}}/></Col> */}
                        <Col className={classes.WriteBox} xs={12}style={{border:'green 1px solid'}}>
                            <Row>
                                <Col xs={12}>
                                    <InputGroup>
                                        <InputGroup.Prepend style={{display:'flex',alignItems:'flex-start'}}>
                                            <InputGroup.Text style={{backgroundColor:'white', border:'white'}}><Image src={WriteImage} roundedCircle style={{height:'50px', width:'50px'}}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="textarea" aria-label="With textarea" placeholder="Hello! I am Groot.." style={{height:'120px',border:'white'}}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col xs={1}><ion-icon name="image-outline"></ion-icon></Col>
                                <Col xs={1}><ion-icon name="videocam-outline"></ion-icon></Col>
                                <Col xs={1}><ion-icon name="camera-outline"></ion-icon></Col>
                                <Col xs={3}><Button variant="primary" size="sm" >Post</Button></Col>
                            </Row>
                            
                        </Col>
                    </Row>
                </Container>
            </Auxiliary>
        )
    }
}

export default Following