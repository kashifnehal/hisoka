import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap'
import EachPost from '../../../components/EachFormat/EachPost/EachPost'
import classes from './Following.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadPost, addPost } from '../../../store/actions/followingActions'
import { loadComment } from '../../../store/actions/commentActions'
import CommentPage from '../../CommentPage/CommentPage'
import ProfilePage from '../../ProfilePage/ProfilePage'
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
        likeCount: 0,
        postPrivacy: 'public',
        addPostModalShow: false,
        callEachPost: false,
        commentShow: false,
        showProfile: false
    }

    componentDidMount = async () => {
        this.setState({ callEachPost: true })
        await this.props.onLoadPost()
    }

    componentDidUpdate = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/loginPage"
            })
        }
    }

    // postHandler = () => {
    //     // console.log('all post only', this.props.allPosts);
    //     if (this.props.user !== null) {
    //         return this.props.allPosts.map(curpost => {
    //             return <EachPost post={curpost} key={curpost._id} userUniversity={this.props.user.university} callComment={() => this.toCommentPageHandler(curpost._id)} />
    //         })
    //     }
    // }

    // toCommentPageHandler = (postId) => {
    //     this.props.history.push({
    //         pathname: "/commentPage"
    //     })
    //     this.props.onLoadComment(postId)
    // }

    toCommentPageHandler = (postId) => {
        this.setState({ commentShow: true })
        this.props.onLoadComment(postId)
    }

    commentShowHandler = () => {
        this.setState({ commentShow: false })
    }

    fileSelectHandler = event => {
        // console.log('selected image', event.target.files[0]);
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
        // data.append("pic", this.state.pic);
        // data.append("name", this.state.name);
        data.append("caption", this.state.caption);
        data.append("media", this.state.media);
        data.append("likeCount", this.state.likeCount);
        data.append("postPrivacy", this.state.postPrivacy);

        // console.log('media ', data.get('media'));

        await this.props.onAddPost(data, this.props.user._id)
        this.setState({ caption: '', addPostModalShow: false, media: '', likeCount: 0 })

    }

    gotoProfilePage = () => {
        this.props.history.push({
            pathname: "/profilePage",
            state: { user: this.props.user }
        })
    }
    // callProfileHandler = () => {
    //     console.log('calling profilepage');
    //     return <ProfilePage user={this.props.user} />
    //     this.setState({ showProfile: false })
    // }

    heartClickedHandler = (heart) => {
        if (heart === false) {
            console.log('if heart', heart);
            heart = true

            //delete profile id from post req
        } else if (heart === true) {
            console.log('else heart')
            heart = false
            //add profile id in post. req
        }
    }

    eachPostHandler = () => {
        if (this.props.user !== null) {
            return this.props.allPosts.map(curpost =>
            // curpost.profileowner[0].profilePic !== undefined ?
            {
                return <EachPost
                    post={curpost}
                    key={curpost._id}
                    userUniversity={this.props.user.university}
                    commentClicked={() => this.toCommentPageHandler(curpost._id)}
                    heartClicked={this.heartClickedHandler}
                    heart={this.state.currentHeart}
                    curUserId={this.props.user._id}
                // curHeart={this.props.heart}
                />
            }
                // : null
            )
        }
    }


    render() {
        let userProfilePic = null

        if (this.props.user !== null) {
            if (this.props.user.profilePic !== "") {
                userProfilePic = <Image src={process.env.PUBLIC_URL + '/images/' + String(this.props.user.profilePic)} roundedCircle style={{ height: '50px', width: '50px' }} onClick={this.gotoProfilePage} />
            }
        }
        // console.log('profile details', this.props.proDetails)
        return (
            <Auxiliary className={classes.Write}>
                {/* {this.state.showProfile ? this.callProfileHandler() : null} */}
                <Container fluid className={classes.WriteContainer} style={{ backgroundColor: 'white', marginTop: '5px' }}>
                    <Row className={classes.WriteRow} style={{ paddingTop: '20px' }} >
                        <Col className={classes.WritePic} xs={2} style={{}} onClick={this.gotoProfilePage}>
                            <span>{userProfilePic}</span>
                        </Col>
                        <Col className={classes.WriteBox} xs={10} style={{}} onClick={() => this.setState({ addPostModalShow: true })}>
                            <Row style={{ paddingLeft: '10px' }}>
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
                {/* if (this.props.user !== null) {
            return this.props.allPosts.map(curpost => {
                return <EachPost post={curpost} key={curpost._id} userUniversity={this.props.user.university} callComment={() => this.toCommentPageHandler(curpost._id)} />
            })
        } */}
                {this.eachPostHandler()}
                {/* {this.props.user !== null ?
                    this.props.allPosts.map(curpost =>
                        // curpost.profileowner[0].profilePic !== undefined ?
                        (
                            <EachPost
                                post={curpost}
                                key={curpost._id}
                                userUniversity={this.props.user.university}
                                commentClicked={() => this.toCommentPageHandler(curpost._id)}
                                heartClicked={this.heartClickedHandler}
                                heart={this.state.currentHeart}
                                curUserId={this.props.user._id}
                                curHeart={this.props.heart}
                            />
                        )
                        // : null
                    ) : null} */}

                <CommentPage commentShow={this.state.commentShow} commentShowHandler={this.commentShowHandler} />


                {/* {this.state.callEachPost === true ? this.postHandler : null} */}
                <Modal
                    show={this.state.addPostModalShow}
                    onHide={() => this.setState({ addPostModalShow: false })}
                    // {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Body>
                        <Container fluid className={classes.WriteContainer} style={{ backgroundColor: 'white', marginTop: '5px' }}>
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
        onLoadComment: (postId) => dispatch(loadComment(postId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));
