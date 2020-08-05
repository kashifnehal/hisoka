import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { Container, Row, Col, Tabs, Tab, Spinner, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadWhatif, addWhatif } from '../../store/actions/whatifActions'
import EachWhatif from '../../components/EachFormat/EachWhatif/EachWhatif'


class Whatif extends Component {
    state = {
        whatifCallFlag: false,
        addWhatifModalShow: false,
        ifname: '',
        text: '',
        likeCount: 0,
    }

    componentDidMount = async () => {
        if (this.props.user !== null) {
            await this.props.onloadWhatif(this.props.user._id)
        }
    }

    componentDidUpdate = async () => {
        if (!this.state.whatifCallFlag) {
            if (this.props.isLoading === false) {
                await this.props.onloadWhatif(this.props.user._id)
                this.setState({ whatifCallFlag: true })
                console.log('request made')
            }
        }
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            ifname: this.state.ifname,
            text: this.state.text,
            likeCount: this.state.likeCount
        }
        console.log('whatif post data', data, this.props.user._id)
        await this.props.onAddWhatif(data, this.props.user._id)
        this.setState({ addWhatifModalShow: false })
    }

    render() {
        let contentWhatif = <Spinner />
        if (this.props.loadingWhatif === false) {
            contentWhatif = (
                <Auxiliary>
                    <Container fluid style={{ marginTop: '40px' }}>
                        <Row style={{ paddingTop: '20px' }} onClick={() => this.setState({ addPostModalShow: true })}>
                            <Col xs={3}></Col>
                            <Col xs={5}>
                                <Row>
                                    <Col xs={12} onClick={() => this.setState({ addWhatifModalShow: true })} style={{ backgroundColor: 'white', padding: '20px' }}>
                                        <p aria-disabled={true} >What's your weird thought..?</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4}></Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col xs={3}></Col>
                            <Col xs={6}>
                                <Tabs defaultActiveKey="trending" id="uncontrolled-tab-example" >
                                    <Tab eventKey="trending" title="Trending" onClick={this.userPostsHandler} >
                                        <EachWhatif />
                                    </Tab>
                                    <Tab eventKey="recent" title="Recent">

                                    </Tab>
                                </Tabs>

                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                    </Container>
                </Auxiliary>
            )
        }
        // console.log('what if data', this.props.whatifData)
        return (
            <div>
                {contentWhatif}
                <Modal
                    show={this.state.addWhatifModalShow}
                    onHide={() => this.setState({ addWhatifModalShow: false })}
                    // {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Body>
                        <Container fluid fluid style={{ backgroundColor: 'white', marginTop: '5px' }}>
                            <Row>
                                <h5>YOUR WHAT-IF THOUGHT ?</h5>
                                <Col xs={1}></Col>
                                <Col xs={10}>
                                    <Row style={{ marginTop: '25px' }}>
                                        <Col xs={4}><p>Post Anonymously</p></Col>
                                        <Col xs={8}><input type="text" placeholder="your if-name..." value={this.state.ifname} onChange={e => this.setState({ ifname: e.target.value })} /></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}></Col>
                                        <Col xs={8} style={{ marginTop: '-30px' }}>
                                            <Button variant="secondary" size="md" onClick={() => this.setState({ ifname: this.props.user.username })}>Use Original Name</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '25px' }}>
                                        <Col xs={4}><p>Your Thought:</p></Col>
                                        <Col xs={6} >
                                            <textarea value={this.state.text} onChange={e => this.setState({ text: e.target.value })} rows="4" cols="" placeholder="what if.." style={{ outline: 'none' }} ></textarea>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={1}></Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer >
                        <Row >
                            <Col><Button variant="primary" size="sm" onClick={() => this.setState({ addWhatifModalShow: false })}>Close</Button></Col>
                            <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.auth.isLoading,
        whatifData: state.whatif.whatifData,
        loadingWhatif: state.whatif.loadingWhatif
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onloadWhatif: (profileId) => dispatch(loadWhatif(profileId)),
        onAddWhatif: (data, profileId) => dispatch(addWhatif(data, profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Whatif));
