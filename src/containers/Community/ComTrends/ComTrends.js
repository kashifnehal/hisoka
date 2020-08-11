import React, { Component } from 'react';
import { Container, Row, Col, Modal, Tabs, Tab, Button } from 'react-bootstrap'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import classes from './ComTrends.css';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadCommunity, loadUserCommunity, addCommunity, loadUnivCommunity } from '../../../store/actions/communityActions'
import FolCommunity from '../../../components/commmunityTabs/FolCommunity/FolCommunity'
import UnivCommunity from '../../../components/commmunityTabs/UnivCommunity/UnivCommunity'
import OverallCommunity from '../../../components/commmunityTabs/OverallCommunity/OverallCommunity'

class ComTrends extends Component {
    state = {
        showCreateComModal: false,
        communityPrivacy: 'public',
        name: '',
        pic: '',
        showAdminCom: false
    }

    toggleAdminCom = () => {
        const newshowAdcom = !this.state.showAdminCom
        this.setState({ showAdminCom: newshowAdcom })
    }

    componentDidMount = async () => {
        if (this.props.user !== null) {
            await this.props.onLoadCommunity()
            await this.props.onLoadUserCommunity(this.props.user._id)
            await this.props.onLoadUnivCommunity(this.props.user.university)
        }
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

        this.props.history.push({
            pathname: "/community",
            state: { name: this.state.name, communityPrivacy: this.state.communityPrivacy }
        })
    }


    render() {
        let adminDeskCom = (
            <Container className={classes.ComTrendsDesktop}>
                <h3 style={{ paddingTop: '100px' }}>Followed Communities</h3>
                <Row className={classes.scrollmenu}>
                    <Col >
                        {/* <br /><button>Show All</button><br /> */}
                        <h6>comm you followed</h6>
                        {/* {this.props.loadingUserCommunity === false ? this.props.allUserCommunity.map(curcom => {
                                return <a><FolCommunity className={classes.eachCard} key={curcom._id} curcom={curcom} /></a>
                            }) : null} */}
                    </Col>
                </Row>
                <h3 style={{ paddingTop: '100px' }}>Trending in {this.props.user.university}</h3>
                <Row className={classes.scrollmenu}>
                    <Col>
                        {this.props.loadingUnivCommunity === false ? this.props.allUnivCommunity.map(curcom => {
                            return <a><UnivCommunity key={curcom._id} curcom={curcom} /></a>
                        }) : null}
                    </Col>
                </Row>
                <h3 style={{ paddingTop: '100px' }}>Trending Overall</h3>
                <Row className={classes.scrollmenu} style={{ marginBottom: '50px' }}>
                    <Col>
                        {this.props.loadingCommunity === false ? this.props.allCommunity.map(curcom => {
                            return <a><OverallCommunity key={curcom._id} curcom={curcom} /></a>
                        }) : null}
                    </Col>
                </Row>
            </Container>
        )
        if (this.state.showAdminCom) {
            adminDeskCom = <Container>
                <h3 style={{ paddingTop: '100px' }}>Your Communities</h3>
                <Row className={classes.scrollmenu}>
                    <Col >
                        <br /><button>Show All</button><br />
                        {this.props.loadingUserCommunity === false ? this.props.allUserCommunity.map(curcom => {
                            return <a><FolCommunity className={classes.eachCard} key={curcom._id} curcom={curcom} /></a>
                        }) : null}
                    </Col>
                </Row>
            </Container>
        }


        return (
            <Auxiliary style={{ paddingTop: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '150px 50px 0 50px' }}>
                    <button onClick={this.toggleAdminCom} >{this.state.showAdminCom ? 'Close' : 'Yo Admin'}</button>
                    <button onClick={this.showCreateComModalHandler}>+ CreateOne</button>
                </div>
                {adminDeskCom}
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
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h6>Showing Trending Communities from</h6>
                                    <Tabs defaultActiveKey="following" id="uncontrolled-tab-example" >
                                        <Tab eventKey="following" title="Following" onClick={this.userPostsHandler} >
                                            <br /><button>Show All</button><br />
                                            {this.props.loadingUserCommunity === false ? this.props.allUserCommunity.map(curcom => {
                                                return <FolCommunity key={curcom._id} curcom={curcom} />
                                            }) : null}
                                        </Tab>
                                        <Tab eventKey="silicon" title="Silicon">
                                            {this.props.loadingUnivCommunity === false ? this.props.allUnivCommunity.map(curcom => {
                                                return <UnivCommunity key={curcom._id} curcom={curcom} />
                                            }) : null}
                                        </Tab>

                                        <Tab eventKey="friends" title="Overall" >
                                            {this.props.loadingCommunity === false ? this.props.allCommunity.map(curcom => {
                                                return <OverallCommunity key={curcom._id} curcom={curcom} />
                                            }) : null}
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
        allUserCommunity: state.community.allUserCommunity,
        allUnivCommunity: state.community.allUnivCommunity,
        loadingCommunity: state.community.loadingCommunity,
        loadingUserCommunity: state.community.loadingUserCommunity,
        loadingUnivCommunity: state.community.loadingUnivCommunity,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadCommunity: () => dispatch(loadCommunity()),
        onLoadUserCommunity: (profileId) => dispatch(loadUserCommunity(profileId)),
        onLoadUnivCommunity: (univName) => dispatch(loadUnivCommunity(univName)),
        onAddCommunity: (data, profileId) => dispatch(addCommunity(data, profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComTrends));