import React, { Component } from 'react'
import Auxiliary from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Footbar from '../../components/Navigation/Footbar/Footbar'
import classes from './Layout.css'
import { Route, Switch } from 'react-router-dom'
import FollowingPage from '../../containers/FollowingPage/FollowingPage'
import ProfilePage from '../../containers/ProfilePage/ProfilePage'
import CommentPage from '../../containers/CommentPage/CommentPage'
import Timeline from '../../containers/ProfilePage/Timeline/Timeline'
import Trends from '../../containers/Trends/Trends'
import Whatif from '../../containers/WhatIf/WhatIf'
import ChatPage from '../../containers/Chatpage/ChatPage'
import { connect } from 'react-redux'
import { withRouter } from "react-router";


class Layout extends Component {

    render() {
        return (
            <Auxiliary classname={classes.Layout}>
                <Toolbar universityName={this.props.user !== null ? this.props.user.university : null} />
                <Switch>
                    <Route path="/" exact component={FollowingPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/whatif" component={Whatif} />
                    <Route path="/trends" component={Trends} />
                    <Route path="/chat" component={ChatPage} />
                </Switch>
                <Footbar />
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