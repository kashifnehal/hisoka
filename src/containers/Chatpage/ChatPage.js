import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import io from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from 'axios'
// import moment from "moment";

import moment from "moment";
import { getChats, afterPostMessage } from "../../store/actions/chatActions"
import ChatCard from "./Sections/ChatCard"

class ChatPage extends Component {

    state = {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "http://localhost:5000";
        this.props.onGetChats()

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log("messageFromBackEnd", messageFromBackEnd)
            this.props.onAfterPostMessage(messageFromBackEnd)
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats
        && this.props.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));


    onDrop = (files) => {
        console.log(files)


        // if (this.props.user.userData && !this.props.user.userData.isAuth) {
        //     return alert('Please Log in first');
        // }



        let formData = new FormData;

        // const config = {
        //     header: { 'content-type': 'multipart/form-data' }
        // }

        formData.append("file", files[0])

        axios.post('http://localhost:5000/chat/uploadfiles', formData)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let userId = this.props.user._id;
                    let userName = this.props.user.name;
                    let userImage = this.props.user.profilePic;
                    let nowTime = moment();
                    let type = "VideoOrImage"

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        nowTime,
                        type
                    });
                }
            })
    }

    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.user._id;
        let userName = this.props.user.name;
        let userImage = this.props.user.profilePic;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        // console.log('userid', userId)
        this.setState({ chatMessage: "" })
    }
    render() {
        // console.log('chats...', this.props.chats);
        return (
            <Auxiliary style={{ marginTop: '100px' }}>

                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center', marginTop: '100px' }}> Real Time Chat</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '350px', overflowY: 'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Col span={18}>
                            <input type="text" id="message" placeholder="Let's start talking" onChange={this.hanleSearchChange} value={this.state.chatMessage} />

                        </Col>
                        <Col span={2}>
                            <Dropzone onDrop={this.onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Button>
                                                {/* <Icon type="upload" /> */} Upload
                                            </Button>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Col>

                        <Col span={4}>
                            <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} type="submit">
                                {/* <Icon type="enter" /> */} Submit
                                </Button>
                        </Col>
                    </Row>
                </div>


                {/* ================================ */}
            </Auxiliary >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        chats: state.chat.chats,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetChats: () => dispatch(getChats()),
        onAfterPostMessage: (messageFromBackEnd) => dispatch(afterPostMessage(messageFromBackEnd))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));
