import React , {Component} from 'react'
import axios from 'axios'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import PostDetails from '../../../components/PostDetails/PostDetails'
import EachPost from '../../../components/PostDetails/EachPost/EachPost'
import Button from 'react-bootstrap/Button'
import classes from './Following.css'
// import WriteImage from '../../../assets/images/2.jpg'
// import AddMedia from './AddMedia/AddMedia'



class Following extends Component {
    state = {
        postData:[],
        mediaClicked:false,
        pic:'profile pic',
        name:'kashif',
        // date:'2020-08-01T15:28:32.886Z',
        caption:'',
        media:'',
        likes:0
    }

    componentDidMount () {
        axios.get('http://localhost:5000/postPage/')
            .then(res => {
                this.setState({postData:res.data})
            })
            .catch(err => {console.log(err)})
    }
    
    postHandler = () => {
        return this.state.postData.map(curpost => {
            return <EachPost post={curpost} key={curpost._id} />
        })
    }
    
    fileSelectHandler = event => {
        this.setState({
            media:event.target.files[0],
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

        const data = new FormData();
        data.append("pic",this.state.pic);
        data.append("name",this.state.name);
        // data.append("date",this.state.date);
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

        window.location = '/followingPage'
    }

    render () {
        
        
        return (
            <Auxiliary className={classes.Write}>
                <Container className={classes.WriteContainer} fluid style={{backgroundColor:'white',marginTop:'5px'}}>
                    <Row className={classes.WriteRow}>
                        <Col className={classes.WritePic} xs={2} style={{}}><Image src={process.env.PUBLIC_URL + '/images/IMAGE-1592981215755.jpg'} roundedCircle style={{height:'50px', width:'50px'}}/></Col>
                        <Col className={classes.WriteBox} xs={10}style={{}}>
                            <Row>
                                <Col xs={12} >
                                    <textarea className={classes.text} onChange={this.onChangeCaption} rows="4" cols="40" placeholder="Hello! I am Groot..." style={{outline:'none',border:'none'}} ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col>
                                    <label htmlFor="file"><ion-icon name="videocam-outline" size="large"></ion-icon></label>
                                    <input type="file" id="file" onChange={this.fileSelectHandler} name="media" style={{display:'none'}}/>
                                    {/* <input type="file" name="media" onChange={this.fileSelectHandler} accept=".jpg"/> */}
                                </Col>
                                <Col>
                                    {/* <button onClick={this.captureHandler}>capture</button> */}
                                </Col>
                                <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.postHandler()}
                {/* <div>
                    {this.state.postData.map(n => (
                    
                        <EachPost
                            key={n.id} 
                            pic={n.pic}
                            name={n.name}
                            date={n.data}
                            caption={n.caption}
                            media={n.media}
                            likes={n.likes} />
                    ))}
                </div> */}
            </Auxiliary>
        )
    }
}

export default Following

