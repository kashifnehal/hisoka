import React, { Component } from 'react';
import { Container, Row, Col, Modal, Tabs, Tab, Button } from 'react-bootstrap'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import classes from './ComTrends.css';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadCommunity, addCommunity } from '../../../store/actions/communityActions'

class ComTrends extends Component {
    state = {
        showCreateComModal: false,
        communityPrivacy: 'public',
        name: '',
        pic: ''
    }

    componentDidMount = async () => {
        await this.props.onLoadCommunity(this.props.user._id)
    }

    closeCreateComModalHandler = () => {
        this.setState({ showCreateComModal: false })
    }
    showCreateComModalHandler = () => {
        this.setState({ showCreateComModal: true })
    }
    onSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            pic: this.state.pic,
            name: this.state.name,
            communityPrivacy: this.state.communityPrivacy,
        }
        await this.props.onAddCommunity(data, this.props.user._id)
        this.setState({ name: '', communityPrivacy: 'public', showCreateComModal: false })
    }


    render() {
        console.log('allcomm', this.props.allCommunity);
        return (
            <Auxiliary style={{ paddingTop: '100px' }}>
                <Container className={classes.ComTrendsDesktop}>
                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Col><button >Yo Admin</button></Col>
                        <Col><button onClick={this.showCreateComModalHandler}>+ CreateOne</button></Col>
                    </Row>
                    <h3 style={{ paddingTop: '100px' }}>Your Communities</h3>
                    <h3 style={{ paddingTop: '100px' }}>Trending in Silicon</h3>
                    <h3 style={{ paddingTop: '100px' }}>Trending Overall</h3>
                </Container>
                <Container>
                    <Row>
                        <Modal
                            show={this.state.showCreateComModal}
                            onHide={this.closeCreateComModalHandler}
                            // {...this.props}
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Body>
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <label htmlFor="name">Community Name</label>
                                            <input type="text" id="name" onChange={(e) => this.setState({ name: e.target.value })} name="name" />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <label htmlFor="communityPrivacy">Community Privacy</label>
                                            <select name="communityPrivacy" id="communityPrivacy" onChange={e => this.setState({ communityPrivacy: e.target.value })}>
                                                <option value="public" >Public</option>
                                                {this.props.user !== null ? <option value={this.props.user.university}>{this.props.user.university}</option> : null}
                                                <option value="followers">Followers</option>
                                            </select>
                                        </Col>
                                    </Row>

                                </Container>
                            </Modal.Body>
                            <Modal.Footer >
                                <Row >
                                    <Col><Button variant="primary" size="sm" onClick={this.closeCreateComModalHandler}>Close</Button></Col>
                                    <Col><Button variant="primary" size="sm" onClick={this.onSubmitHandler}>Post</Button></Col>
                                </Row>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container>
                <Container className={classes.ComTrendsMobile}>
                    <Row style={{ paddingTop: '100px' }}>
                        <Container>
                            <Row>
                                <Col><button >Yo Admin</button></Col>
                                <Col><button onClick={this.showCreateComModalHandler}>+ CreateOne</button></Col>
                            </Row><br />
                            <Row>
                                <Col>
                                    <h6>Showing Trending Communities from</h6>
                                    <Tabs defaultActiveKey="following" id="uncontrolled-tab-example" >
                                        <Tab eventKey="following" title="Following" onClick={this.userPostsHandler} >
                                            <br /><button>Show All</button><br />
                                            Communities You Follow
                                        </Tab>
                                        <Tab eventKey="silicon" title="Silicon">
                                            Trending in Silicon
                                        </Tab>

                                        <Tab eventKey="friends" title="Overall" >
                                            Trending Overall
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>

            </Auxiliary >
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        allCommunity: state.community.allCommunity,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadCommunity: (profileId) => dispatch(loadCommunity(profileId)),
        onAddCommunity: (data, profileId) => dispatch(addCommunity(data, profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComTrends));