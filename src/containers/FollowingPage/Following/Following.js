import React, { Component } from 'react'
import axios from 'axios'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap'
import EachPost from '../../../components/EachFormat/EachPost/EachPost'
import classes from './Following.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadPost, addPost } from '../../../store/actions/followingActions'
import { loadComment } from '../../../store/actions/commentActions'
// import AddPost from './AddPost/AddPost'


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
        likes: 0,
        addPostModalShow: false,
        postPrivacy: 'public',
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
        // console.log('all post only', this.props.allPosts);
        if (this.props.user !== null) {
            return this.props.allPosts.map(curpost => {
                return <EachPost post={curpost} key={curpost._id} userUniversity={this.props.user.university} callComment={() => this.toCommentPageHandler(curpost._id)} />
            })
        }
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
        data.append("postPrivacy", this.state.postPrivacy);

        await this.props.onAddPost(data, this.props.user._id)
        this.setState({ caption: '', addPostModalShow: false })

    }

    gotoProfilePage = () => {
        this.props.history.push({
            pathname: "/profilePage"
        })
    }

    render() {
        let userProfilePic = <Image onClick={this.gotoProfilePage} src={process.env.PUBLIC_URL + '/images/default.png'} style={{ height: '50px', width: '50px' }} />

        if (this.props.user !== null) {
            if (this.props.user.profilePic !== "") {
                userProfilePic = <Image src={process.env.PUBLIC_URL + '/images/' + String(this.props.user.profilePic)} onClick={this.gotoProfilePage} roundedCircle style={{ height: '50px', width: '50px' }} />
            }
        }
        // console.log('profile details', this.props.proDetails)
        return (
            <Auxiliary className={classes.Write}>
                <Container fluid className={classes.WriteContainer} fluid style={{ backgroundColor: 'white', marginTop: '5px' }}>
                    <Row className={classes.WriteRow} style={{ paddingTop: '20px' }} onClick={() => this.setState({ addPostModalShow: true })}>
                        <Col className={classes.WritePic} xs={2} style={{}}>
                            {userProfilePic}
                        </Col>
                        <Col className={classes.WriteBox} xs={10} style={{}}>
                            <Row>
                                <Col xs={12} >
                                    <textarea disabled={true} className={classes.text} rows="1" cols="" placeholder="Hello! I am Groot..." style={{ outline: 'none', border: 'none' }} ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col xs={4} >
                                    {/* <select disabled={true} name="postPrivacy" id="postPrivacy" >
                                        <option value="public">Public</option>
                                        <option value="college">college</option>
                                        <option value="followers">Followers</option>
                                    </select> */}
                                </Col>
                                <Col xs={2}>
                                    <label ><ion-icon name="videocam-outline" size="large"></ion-icon></label>
                                    {/* <input disabled={true} type="file" id="file" name="media" style={{ display: 'none' }} /> */}
                                    {/* <input type="file" name="media" onChange={this.fileSelectHandler} accept=".jpg"/> */}
                                </Col>
                                <Col>
                                    {/* <button onClick={this.captureHandler}>capture</button> */}
                                </Col>
                                {/* <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col> */}
                            </Row>
                        </Col>
                    </Row>

                </Container>
                {/* <Button variant="primary" onClick={() => this.setState({ addPostModalShow: true })}>
                    Launch vertically centered modal
                </Button> */}

                {/* <AddPost
                    show={this.state.addPostModalShow}
                    onHide={() => this.setState({ addPostModalShow: false })}
                /> */}

                {this.postHandler()}
                <Modal
                    show={this.state.addPostModalShow}
                    onHide={() => this.setState({ addPostModalShow: false })}
                    // {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Body>
                        <Container fluid className={classes.WriteContainer} fluid style={{ backgroundColor: 'white', marginTop: '5px' }}>
                            <Row className={classes.WriteRow}>
                                <Col className={classes.WritePic} xs={2} style={{}}>
                                    {userProfilePic}
                                </Col>
                                <Col className={classes.WriteBox} xs={10} style={{}}>
                                    <Row>
                                        <Col xs={12} >
                                            <textarea className={classes.text} value={this.state.caption} onChange={this.onChangeCaption} rows="4" cols="" placeholder="Hello! I am Groot..." style={{ outline: 'none', border: 'none' }} ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}></Col>
                                        <Col xs={4} >
                                            <select name="postPrivacy" id="postPrivacy" onChange={e => this.setState({ postPrivacy: e.target.value })}>
                                                <option value="public" >Public</option>
                                                {this.props.user !== null ? <option value={this.props.user.university}>{this.props.user.university}</option> : null}
                                                {/* <option value="followers">Followers</option> */}
                                            </select>
                                        </Col>
                                        <Col xs={2}>
                                            <label htmlFor="file"><ion-icon name="videocam-outline" size="large"></ion-icon></label>
                                            <input type="file" id="file" onChange={this.fileSelectHandler} name="media" style={{ display: 'none' }} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Container>
                    </Modal.Body>
                    <Modal.Footer >
                        <Row >
                            <Col><Button variant="primary" size="sm" onClick={() => this.setState({ addPostModalShow: false })}>Close</Button></Col>
                            <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
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
