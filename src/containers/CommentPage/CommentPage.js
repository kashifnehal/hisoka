import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EachComment from '../../components/EachFormat/EachComment/EachComment'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from './CommentPage.css'
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import { addComment } from '../../store/actions/commentActions'


class CommentPage extends Component {
    state = {
        text: '',
        likeCount: 0,
    }
    commentHandler = () => {
        return this.props.allComments.map(curComment => {
            return <EachComment comment={curComment} key={curComment._id} />
        })
    }
    onChangeComment = (e) => {
        this.setState({ text: e.target.value })
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        // const data = new FormData();
        // data.append("text", this.state.text);
        // data.append("likes", this.state.likes);

        const data = {
            text: this.state.text,
            likeCount: this.state.likeCount,
            username: this.props.user.username,
            pic: this.props.user.profilePic
        }

        console.log('from page', data, this.props.postId)
        await this.props.onAddComment(data, this.props.user._id, this.props.postId)
        this.setState({ text: '' })

    }

    render() {
        let commentProfilePic = null
        if (this.props.isLoading === false && this.props.user !== null) {
            commentProfilePic = <Image src={process.env.PUBLIC_URL + '/images/' + String(this.props.user.profilePic)} roundedCircle style={{ height: '40px', width: '40px' }} />
        }
        // console.log('post id ', this.props.postId);
        // console.log('all comments', this.props.allComments)
        return (
            <Auxiliary>
                <Modal
                    show={this.props.commentShow}
                    onHide={this.props.commentShowHandler}
                    // {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <Container fluid style={{ backgroundColor: '#efefef' }}>
                            <Row>
                                <Col xs={2}>{commentProfilePic}</Col>
                                <Col xs={6}>
                                    <textarea className={classes.text} rows="" cols="25" placeholder="Add Comment..." value={this.state.text} onChange={this.onChangeComment} style={{ outline: 'none', border: 'none', height: '30px' }} ></textarea>
                                </Col>
                                <Col xs={2}><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                            </Row>
                        </Container>
                        {this.commentHandler()}
                    </Modal.Body>
                </Modal>

            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        allComments: state.comment.allComments,
        postId: state.comment.postId,
        user: state.auth.user,
        isLoading: state.auth.isLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (data, profileId, postId) => dispatch(addComment(data, profileId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentPage));