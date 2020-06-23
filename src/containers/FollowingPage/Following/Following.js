import React , {Component} from 'react'
import axios from 'axios'
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



class Following extends Component {
    state = {
        mediaClicked:false,
        pic:'profile pic',
        name:'kashif',
        date:'2020-08-01T15:28:32.886Z',
        caption:'',
        media:'',
        likes:0
    }
    
    fileSelectHandler = event => {
        // console.log(event.target.files[0])
        this.setState({
            media:event.target.files[0],
            // pic:event.target.files[0]
        })
    }

    captureHandler = () => {
        this.setState({mediaClicked:true})
    }

    onChangeCaption = (event) => {
        this.setState({caption:event.target.value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        
        // const post = {
        //     pic: this.state.pic,
        //     name:this.state.name,
        //     date:this.state.date,
        //     caption:this.state.caption,
        //     media:this.state.media,
        //     likes:this.state.likes
        // }

        const data = new FormData();
        data.append("pic",this.state.pic);
        data.append("name",this.state.name);
        data.append("date",this.state.date);
        data.append("caption",this.state.caption);
        data.append("media",this.state.media);
        data.append("likes",this.state.likes);
        
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        console.log(data)

        axios.post('http://localhost:5000/postPage/add', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))

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
                                    <textarea className={classes.text} onChange={this.onChangeCaption} rows="4" cols="40" placeholder="Hello! I am Groot..." style={{outline:'none',border:'none'}} ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col>
                                    {/* <label htmlFor="file"><ion-icon name="videocam-outline" size="large"></ion-icon></label> */}
                                    {/* <input type="file" id="file" onChange={this.fileSelectHandler} accept=".jpg" style={{display:'none'}}/> */}
                                    <input type="file" name="media" onChange={this.fileSelectHandler} accept=".jpg"/>
                                </Col>
                                <Col>
                                    {/* <button onClick={this.captureHandler}>capture</button> */}
                                </Col>
                                <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </Auxiliary>
        )
    }
}

export default Following

