import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Footbar from '../../components/Navigation/Footbar/Footbar'
import classes from './Layout.css'
import { Route, Switch } from 'react-router-dom'
import FollowingPage from '../../containers/FollowingPage/FollowingPage'
import ProfilePage from '../../containers/ProfilePage/ProfilePage'


class Layout extends Component {

    render() {
        return (
            <Aux classname={classes.Layout}>
                <Toolbar />
                <Switch>
                    <Route path="/" exact component={FollowingPage} />
                    <Route path="/profilePage" component={ProfilePage} />
                </Switch>
                <Footbar />
            </Aux>
        )
    }
}

export default Layout