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
        likes: 0,
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
            likes: this.state.likes,
            username: this.props.user.username,
            pic: this.props.user.profilePic
        }

        console.log('from page', data, this.props.postId)
        await this.props.onAddComment(data, this.props.postId)

    }

    render() {
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
                                <Col xs={2}><Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{ height: '50px', width: '50px' }} /></Col>
                                <Col xs={6}>
                                    <textarea className={classes.text} rows="" cols="25" placeholder="Add Comment..." onChange={this.onChangeComment} style={{ outline: 'none', border: 'none', height: '30px' }} ></textarea>
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
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (data, postId) => dispatch(addComment(data, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentPage));