import React , {Component} from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import classes from './Following.css'
import WriteImage from '../../../assets/images/2.jpg'
// import AddMedia from './AddMedia/AddMedia'
import Posts from '../../../components/Posts/Posts'



class Following extends Component {
    state= {
        mediaClicked:false
    }
    fileSelectHandler = event => {
        console.log(event.target.files[0])
    }

    captureHandler = () => {
        this.setState({mediaClicked:true})
    }

    render () {
        return (
            <Auxiliary className={classes.Write}>
                <Container className={classes.WriteContainer} fluid style={{backgroundColor:'white',marginTop:'5px'}}>
                    <Row className={classes.WriteRow}>
                        <Col className={classes.WritePic} xs={2} style={{}}><Image src={WriteImage} roundedCircle style={{height:'50px', width:'50px'}}/></Col>
                        <Col className={classes.WriteBox} xs={10}style={{}}>
                            <Row>
                                <Col xs={12} >
                                    <textarea className={classes.text} rows="4" cols="40" placeholder="Hello! I am Groot..." style={{outline:'none',border:'none'}} ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col>
                                    <label htmlFor="imageUpload"><ion-icon name="videocam-outline" size="large"></ion-icon></label>
                                    <input type="file" id="imageUpload" onChange={this.fileSelectHandler} style={{display:'none'}}/>
                                </Col>
                                <Col>
                                    <button onClick={this.captureHandler}>capture</button>
                                </Col>
                                <Col><Button variant="primary" size="sm" >Post</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Posts />
            </Auxiliary>
        )
    }
}

export default Following