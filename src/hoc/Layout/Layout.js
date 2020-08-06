import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Footbar from '../../components/Navigation/Footbar/Footbar'
import classes from './Layout.css'
import { Route, Switch } from 'react-router-dom'
import FollowingPage from '../../containers/FollowingPage/FollowingPage'
import ProfilePage from '../../containers/ProfilePage/ProfilePage'
// import CommentPage from '../../containers/CommentPage/CommentPage'
import Timeline from '../../containers/ProfilePage/Timeline/Timeline'
import Trends from '../../containers/Trends/Trends'
import Whatif from '../../containers/WhatIf/WhatIf'
import ChatPage from '../../containers/Chatpage/ChatPage'
import Logout from '../../containers/Logout/Logout'
import Community from '../../containers/Community/Community'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {
    state = {
        titleBar: 'home',
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerToggleHandler = () => {
        const newShow = !this.state.showSideDrawer
        this.setState({ showSideDrawer: newShow });
    }

    // sideDrawerToggleHandler = () => {
    //     const newShow = !showSideDrawer
    //     this.setState({ showSideDrawer: false });
    // }

    // componentDidMount = () => {
    //     console.log('from did m', this.props.location.pathname);
    // }

    changeToHomeHandler = () => {
        this.setState({ titleBar: 'home' })
        this.props.history.push({
            pathname: "/"
        })
    }
    changeToSearchHandler = () => {
        this.setState({ titleBar: 'search' })
    }
    changeToCommunityHandler = () => {
        this.setState({ titleBar: 'community' })
        this.props.history.push({
            pathname: "/community"
        })
    }
    changeToChatHandler = () => {
        this.setState({ titleBar: 'chat' })
        this.props.history.push({
            pathname: "/chat"
        })
    }

    render() {
        return (
            <Auxiliary classname={classes.Layout}>
                <Toolbar
                    universityName={this.props.user !== null ? this.props.user.university : null}
                    titleBar={this.state.titleBar}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />

                <Switch>
                    <Route path="/" exact component={FollowingPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/whatif" component={Whatif} />
                    <Route path="/trends" component={Trends} />
                    <Route path="/community" component={Community} />
                    <Route path="/chat" component={ChatPage} />
                    <Route path="/logout" component={Logout} />
                </Switch>
                <Footbar
                    changeToHome={this.changeToHomeHandler}
                    changeToSearch={this.changeToSearchHandler}
                    changeToCommunity={this.changeToCommunityHandler}
                    changeToChat={this.changeToChatHandler}
                />
            </Auxiliary>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));