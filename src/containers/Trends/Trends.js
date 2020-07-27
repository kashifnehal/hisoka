// =================== CONTENT FROM ALL COLLGES WITH POPULAR ALGORITHM ===============

import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap'
import EachPost from '../../components/EachFormat/EachPost/EachPost'
import EachTrends from '../../components/EachFormat/EachTrends/EachTrends'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadPost, addPost } from '../../store/actions/followingActions'
import { loadComment } from '../../store/actions/commentActions'

class Trends extends Component {
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
        postPrivacy: 'public',
        addPostModalShow: false,
        callEachPost: false
    }

    componentDidMount = async () => {
        await this.props.onLoadPost()
    }

    componentDidUpdate = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/loginPage"
            })
        }
    }


    toCommentPageHandler = (postId) => {
        this.props.history.push({
            pathname: "/commentPage"
        })
        this.props.onLoadComment(postId)
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
            <Auxiliary >
                <Container style={{ marginTop: '100px' }}>
                    <Row>
                        <Col>
                            {this.props.user !== null ?
                                this.props.allPosts.map(curpost => (
                                    <EachTrends
                                        post={curpost}
                                        key={curpost._id}
                                        userUniversity={this.props.user.university}
                                        callComment={() => this.toCommentPageHandler(curpost._id)}
                                    />
                                )) : null}
                        </Col>
                    </Row>
                </Container>
            </Auxiliary>
        )
    }
}


const mapStateToProps = state => {
    return {
        allPosts: state.following.allPosts,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadPost: () => dispatch(loadPost()),
        onLoadComment: (postId) => dispatch(loadComment(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trends));




