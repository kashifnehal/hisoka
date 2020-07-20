import React, { Component } from 'react'
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
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadPost, addPost } from '../../../store/actions/followingActions'
// import WriteImage from '../../../assets/images/2.jpg'
// import AddMedia from './AddMedia/AddMedia'



class Following extends Component {
    state = {
        postData: [],
        allComments: [],
        mediaClicked: false,
        pic: '',
        name: '',
        // date:'2020-08-01T15:28:32.886Z',
        caption: '',
        media: '',
        likes: 0
    }

    componentDidMount() {
        this.props.onLoadPost()
        // axios.get('http://localhost:5000/postPage/')
        //     .then(res => {
        //         this.setState({ postData: res.data })
        //     })
        //     .catch(err => this.props.onReturnErrors(err.response.data, err.response.status))
    }

    componentDidUpdate = () => {
        // console.log('in folowing cdidup', this.props.isAuthenticated)

        if (!this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/loginPage"
            })
        }
    }

    postHandler = () => {
        // console.log(this.state.postData)
        return this.props.allPosts.map(curpost => {
            // console.log(curpost)
            return <EachPost post={curpost} key={curpost._id} callComment={() => this.toCommentPageHandler(curpost._id)} />
        })
    }

    toCommentPageHandler = (postId) => {
        // console.log('comment fun activated', postId)
        // console.log('the req http://localhost:5000/postPage/' + postId + '/comments');
        axios.get('http://localhost:5000/postPage/' + postId + '/comments')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    fileSelectHandler = event => {
        // console.log('media file', event.target.files[0])
        this.setState({
            media: event.target.files[0],
        })
    }

    captureHandler = () => {
        this.setState({ mediaClicked: true })
    }

    onChangeCaption = (event) => {
        this.setState({ caption: event.target.value })
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("pic", this.state.pic);
        data.append("name", this.state.name);
        // data.append("date",this.state.date);
        data.append("caption", this.state.caption);
        data.append("media", this.state.media);
        data.append("likes", this.state.likes);

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // console.log('whole data', data)
        await this.props.onAddPost(data, this.props.user._id)
        // this.props.onLoadPost()

        // axios.post('http://localhost:5000/postPage/', data)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))

        // console.log('post added')
        // window.location = '/'
    }

    render() {
        // console.log('all posts', this.props.allPosts)
        // console.log('load user content', this.props.user)
        return (
            <Auxiliary className={classes.Write}>
                <Container className={classes.WriteContainer} fluid style={{ backgroundColor: 'white', marginTop: '5px' }}>
                    <Row className={classes.WriteRow}>
                        <Col className={classes.WritePic} xs={2} style={{}}><Image src={process.env.PUBLIC_URL + '/images/IMAGE-1592948142254.jpg'} roundedCircle style={{ height: '50px', width: '50px' }} /></Col>
                        <Col className={classes.WriteBox} xs={10} style={{}}>
                            <Row>
                                <Col xs={12} >
                                    <textarea className={classes.text} onChange={this.onChangeCaption} rows="4" cols="" placeholder="Hello! I am Groot..." style={{ outline: 'none', border: 'none' }} ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col>
                                    <label htmlFor="file"><ion-icon name="videocam-outline" size="large"></ion-icon></label>
                                    <input type="file" id="file" onChange={this.fileSelectHandler} name="media" style={{ display: 'none' }} />
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
            </Auxiliary>
        )
    }
}



const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null
        allPosts: state.following.allPosts,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onReturnErrors: () => dispatch(returnErrors()),
        onLoadPost: () => dispatch(loadPost()),
        onAddPost: (data, profileId) => dispatch(addPost(data, profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));
