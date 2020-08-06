import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import classes from './Toolbar.css'
import SearchBar from '../../../containers/SearchBar/SearchBar'
import ProfileNav from '../../../components/Navigation/ProfileNav/ProfileNav'
import Logo from '../Logo/Logo'
import Home from '../../../assets/images/home.png'
import Chat from '../../../assets/images/chat.png'
import { withRouter } from "react-router";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    // let attachedSearch = ["d-none d-md-block",classes.Search]
    // let attachedNavIcons = ["d-none d-md-block",classes.NavIcons]
    // let attachedProfileNav = ["d-none d-md-block",classes.ProfileNav]
    // let attachedSidebar = ["d-md-none",classes.Sidebar]

    const gotoFollowing = () => {
        props.history.push({
            pathname: "/"
        })
    }

    const gotoTrends = () => {
        props.history.push({
            pathname: "/trends"
        })
    }
    console.log('titlebar is', props.titleBar);
    let title = null
    if (props.titleBar === 'home') {
        title = (<Col className={classes.NavColMiddle} xs={6} sm={4} >
            <h4 onClick={gotoFollowing} style={{ textTransform: 'capitalize' }}>{props.universityName}</h4>
            <h4 style={{ marginLeft: '15%' }} onClick={gotoTrends}>Trends</h4>
        </Col>)
    } else if (props.titleBar === 'search') {
        title = (<Col className={classes.Search} xs={6} sm={4} >
            <SearchBar />
        </Col>)
    } else if (props.titleBar === 'community') {
        title = (<Col className={classes.NavColMiddle} xs={6} sm={4} style={{ display: 'flex', justifyContent: 'space-around' }} >
            <h4>Community</h4>
        </Col>)
    } else if (props.titleBar === 'chat') {
        title = (<Col className={classes.NavColMiddle} xs={6} sm={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h4 >Chat</h4>
        </Col>)
    }


    return (
        <header className={classes.Toolbar}>
            <Container fluid className={classes.NavMain}>
                <Row className={classes.NavRow}>
                    <Col className={classes.NavColLeft} xs={3} sm={3} >
                        <Row>
                            <Col className={classes.Logo} md={5}>
                                <Logo />
                            </Col>

                            <Col className={classes.Search} md={7} >
                                <SearchBar />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DrawerToggle clicked={props.drawerToggleClicked} />
                            </Col>
                        </Row>
                    </Col>
                    {title}
                    <Col className={classes.NavColRight} xs={3} sm={4} >
                        <Row >
                            <Col className={classes.Sidebar}>
                                Right
                            </Col>
                        </Row>
                        <Row className={classes.ProfileAndIcons}>
                            <Col className={classes.NavIcons} md={5} >
                                <Image src={Home} />
                                <Image src={Chat} />
                                {/* <ion-icon name="home-outline" size="large"></ion-icon>
                                <ion-icon name="notifications-outline" size="large"></ion-icon>
                                <ion-icon name="chatbox-outline" size="large"></ion-icon> */}
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

export default withRouter(toolbar)