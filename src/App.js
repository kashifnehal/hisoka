import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import FollowingPage from './containers/FollowingPage/FollowingPage'


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/followingPage" component={FollowingPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
