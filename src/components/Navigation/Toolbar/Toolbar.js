import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classes from './Toolbar.css'
import SearchBar from '../../../containers/SearchBar/SearchBar'
import ProfileNav from '../../../components/Navigation/ProfileNav/ProfileNav'
import Logo from '../Logo/Logo'

const toolbar = (props) => {
    // let attachedSearch = ["d-none d-md-block",classes.Search]
    // let attachedNavIcons = ["d-none d-md-block",classes.NavIcons]
    // let attachedProfileNav = ["d-none d-md-block",classes.ProfileNav]
    // let attachedSidebar = ["d-md-none",classes.Sidebar]
    return (
        <header className={classes.Toolbar}>
            <Container fluid className={classes.NavMain}>
                <Row className={classes.NavRow}>
                    <Col className={classes.NavColLeft} xs={3} sm={3} >
                        <Row>
                            <Col className={classes.Logo} xs={5}>
                                <Logo />
                            </Col>
                            <Col className={classes.Search} md={7} >
                                <SearchBar />
                            </Col>
                        </Row>
                    </Col>
                    <Col className={classes.NavColMiddle} xs={6} sm={4} >
                        <h4>Following</h4>
                        <h4 style={{ marginLeft: '15%' }}>Hot</h4>
                        {/* <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            <ion-icon name="add-circle-outline" size="large"></ion-icon> */}
                    </Col>
                    <Col className={classes.NavColRight} xs={3} sm={4} >
                        <Row >
                            <Col className={classes.Sidebar}>right</Col>
                        </Row>
                        <Row className={classes.ProfileAndIcons}>
                            <Col className={classes.NavIcons} md={5} >
                                <ion-icon name="home-outline" size="large"></ion-icon>
                                <ion-icon name="notifications-outline" size="large"></ion-icon>
                                <ion-icon name="chatbox-outline" size="large"></ion-icon>
                                {/* <ion-icon name="chatbox-outline" size="large"></ion-icon> */}
                            </Col>
                            <Col className={classes.ProfileNav} xs={7}>
                                <ProfileNav />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default toolbar