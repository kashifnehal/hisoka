import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { updateProfile, getUserPosts } from '../../store/actions/profileActions';
import EachPost from '../../components/EachFormat/EachPost/EachPost'
import { Container, Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';
import About from './About/About';
import Timeline from './Timeline/Timeline';


class ProfilePage extends Component {
    state = {
        showEdit: false,
        coverPic: '',
        profilePic: '',
        name: '',
        bio: '',
        updateFlag: false,
        showUserPosts: false,
        showUserAbout: false,
        showUserFriends: false,
        showUserPhotos: false,
        currentUser: null,
        showEditButton: false,
        changeCurrentUser: false
    }




    componentDidMount = async () => {
        if (this.state.currentUser !== null) {
            await this.props.OngetUserPosts(this.state.currentUser._id)
        }
        if (this.props.location.state.user._id == this.props.user._id) {
            this.setState({ currentUser: this.props.user, showEditButton: true })
        } else {
            this.setState({ currentUser: this.props.location.state.user })
        }
    }

    componentDidUpdate = async (prevProps) => {
        // console.log('loading state', this.props.isLoading);
        if (prevProps.user == this.props.user) {
            // console.log('same as prev')
        }
        if (prevProps.user != this.props.user) {
            this.setState({ currentUser: this.props.user })
        }
        if (!this.state.updateFlag) {
            if (this.props.isLoading === false) {
                await this.props.OngetUserPosts(this.state.currentUser._id)
                this.setState({ name: this.state.currentUser.name, bio: this.state.currentUser.bio, updateFlag: true })
            }
        }
    }

    // setEditTrue = () => {
    //     this.setState({ showEdit: true })
    // }
    // setEditFalse = () => {
    //     this.setState({ showEdit: false })
    // }

    // componentDidUpdate = async () => {
    //     // console.log('did update');
    //     if (this.state.updateFlag === false) {
    //         if (this.state.currentUser !== null) {
    //             // console.log('before await did update');
    //             const res2 = await this.props.OngetUserPosts(this.state.currentUser._id)
    //             this.setState({ name: this.state.currentUser.name, bio: this.state.currentUser.bio, updateFlag: true })
    //         }
    //     }
    // }


    profileUpdateHandler = async () => {
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("bio", this.state.bio);
        data.append("profilePic", this.state.profilePic);
        data.append("university", this.state.university);
        // const data = {
        //     // coverPic: this.state.coverPic,
        //     // profilePic: this.state.profilePic,
        //     name: this.state.name,
        //     bio: this.state.bio
        // }
        const res2 = await this.props.onUpdateProfile(data, this.state.currentUser._id)
        this.setState({ showEdit: false })
    }

    coverChangeHandler = event => {
        // console.log('pic files', event.target.files);
        this.setState({
            coverPic: event.target.files[0],
        })
    }

    profilePicChangeHandler = event => {
        // console.log('pic files', event.target.files);
        this.setState({
            profilePic: event.target.files[0],
        })
    }

    // userPostsHandler = async () => {
    //     // console.log('inside userPost handler')
    //     if (!this.state.showUserPosts) {
    //         // console.log('inside seeing post', this.state.showUserPosts);
    //         const res2 = await this.props.OngetUserPosts(this.state.currentUser._id)
    //         this.setState({ showUserPosts: true })
    //     } else {
    //         this.setState({ showUserPosts: false })
    //     }

    // }
    // userAboutHandler = async () => {
    //     if (!this.state.showUserAbout) {
    //         const res2 = await this.props.OngetUserPosts(this.state.currentUser._id)
    //         this.setState({ showUserAbout: true })
    //     }
    // }

    // userFriendsHandler = () => {
    //     this.setState({ showUserFriends: true })
    // }
    // userPhotosHandler = () => {
    //     this.setState({ showUserPhotos: true })
    // }
    callUserPosts = () => {
        // console.log('all post inside handler', this.props.allUserPosts);
        if (this.props.allUserPosts !== null) {
            return this.props.allUserPosts.map(curpost => {
                return <EachPost post={curpost} key={curpost._id} callComment={() => this.toCommentPageHandler(curpost._id)} />
            })
        }
    }

    // callUserAbouts = () => {
    //     return <About />
    // }
    render() {

        // console.log('currentUser', this.state.currentUser);
        const userLoaded = this.props.isLoading === false && this.state.currentUser !== null
        // console.log('alluser post', this.props.allUserPosts)
        // console.log('profile data frm page', this.state.currentUser, this.props.isLoading);
        let proDetails = null
        if (userLoaded) {
            proDetails = (
                <div>
                    <h1 style={{ marginTop: '100px' }}>PROFILE</h1>
                    <Image src={process.env.PUBLIC_URL + '/images/cover.jpg'} style={{ height: '80px', width: '150px' }} />

                    {this.state.currentUser.profilePic === "" ?
                        <Image src={process.env.PUBLIC_URL + '/images/default.png'} style={{ height: '50px', width: '50px' }} /> :
                        <Image src={process.env.PUBLIC_URL + '/images/' + String(this.state.currentUser.profilePic)} roundedCircle style={{ height: '50px', width: '50px' }} />}

                    <p>name:{this.state.currentUser.name}</p>
                    <p>bio:{this.state.currentUser.bio}</p>
                    <p>username:{this.state.currentUser.username}</p>
                    <p>college/university:{this.state.currentUser.university}</p>
                    {this.state.showEditButton ? <button onClick={() => this.setState({ showEdit: true })}>EDIT</button> : null}
                    {/* <p>Links- Timeline About Friends Photos More</p> */}<br /><br />


                    {/* <button onClick={this.userPostsHandler}>Timeline</button>&nbsp;&nbsp;
                    <button onClick={this.userAboutHandler}>About</button>&nbsp;&nbsp;
                    <button onClick={this.userFriendsHandler}>Friends</button>&nbsp;&nbsp;
                    <button onClick={this.userPhotosHandler}>Photos</button> */}

                </div>
            )
        }

        let timelineDetails = <Spinner />
        if (this.props.profileUpdating === false) {
            timelineDetails = (
                <Container>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={12} md={6}>
                            <Tabs defaultActiveKey="timeline" id="uncontrolled-tab-example" >
                                <Tab eventKey="timeline" title="Timeline" onClick={this.userPostsHandler} >
                                    {/* {this.callUserPosts()} */}
                                    <Timeline user={this.state.currentUser} />
                                </Tab>
                                <Tab eventKey="about" title="About">
                                    <About />
                                </Tab>

                                <Tab eventKey="friends" title="Friends" >
                                    Friends
                                    </Tab>
                            </Tabs>

                        </Col>
                        <Col xs={3}></Col>
                    </Row>
                </Container>
            )
        }
        let editComp = null
        if (this.state.showEdit) {
            editComp = (
                <div style={{ marginBottom: '70px' }}>

                    <Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{ height: '50px', width: '50px' }} /><br />

                    <label htmlFor="file"><u>EDIT profilepic</u></label>
                    <input type="file" id="file" onChange={this.profilePicChangeHandler} name="media" style={{ display: 'none' }} />
                    <input type="text" placeholder="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <input type="text" placeholder="bio" value={this.state.bio} onChange={e => this.setState({ bio: e.target.value })} />
                    <button onClick={() => this.setState({ showEdit: false })}>CANCEL</button>
                    <button onClick={this.profileUpdateHandler}>UPDATE</button>
                </div>
            )
        }

        return (
            <Auxiliary>
                {proDetails}
                {timelineDetails}
                {editComp}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading,
        allPosts: state.following.allPosts,
        allUserPosts: state.profile.allUserPosts,
        profileUpdating: state.profile.profileUpdating,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onLoadPost: () => dispatch(loadPost()),
        onUpdateProfile: (data, profileId) => dispatch(updateProfile(data, profileId)),
        OngetUserPosts: (profileId) => dispatch(getUserPosts(profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));