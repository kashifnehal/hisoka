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


class Layout extends Component {

    render() {
        return (
            <Auxiliary classname={classes.Layout}>
                <Toolbar />
                <Switch>
                    <Route path="/" exact component={FollowingPage} />
                    <Route path="/timeline" exact component={Timeline} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/commentPage" component={CommentPage} />
                </Switch>
                <Footbar />
            </Auxiliary>
        )
    }
}

export default Layout