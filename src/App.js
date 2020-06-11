import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Following from './containers/Following/Following'


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/following" component={Following} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
