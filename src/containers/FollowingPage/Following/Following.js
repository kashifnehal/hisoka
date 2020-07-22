import React, { Component } from 'react'
import axios from 'axios'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import PostDetails from '../../../components/PostDetails/PostDetails'
import EachPost from '../../../components/EachFormat/EachPost/EachPost'
import Button from 'react-bootstrap/Button'
import classes from './Following.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadPost, addPost } from '../../../store/actions/followingActions'
import { loadComment } from '../../../store/actions/commentActions'


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
    }

    componentDidUpdate = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/loginPage"
            })
        }
    }

    postHandler = () => {
        return this.props.allPosts.map(curpost => {
            return <EachPost post={curpost} key={curpost._id} callComment={() => this.toCommentPageHandler(curpost._id)} />
        })
    }

    toCommentPageHandler = (postId) => {
        this.props.history.push({
            pathname: "/commentPage"
        })
        this.props.onLoadComment(postId)
        // axios.get('http://localhost:5000/postPage/' + postId + '/comments')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    fileSelectHandler = event => {
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
        data.append("caption", this.state.caption);
        data.append("media", this.state.media);
        data.append("likes", this.state.likes);

        await this.props.onAddPost(data, this.props.user._id)

    }

    render() {
        console.log('profile details', this.props.proDetails)
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
        allPosts: state.following.allPosts,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        proDetails: state.auth.proDetails
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadPost: () => dispatch(loadPost()),
        onAddPost: (data, profileId) => dispatch(addPost(data, profileId)),
        onLoadComment: (postId) => dispatch(loadComment(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));
