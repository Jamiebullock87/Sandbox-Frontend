import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/dashboard" component={Dashboard} />} />
        <Route exact path="/user-profile" component={UserProfile} />} />
      </Switch>
    );
  }
}

export default MainRoutes;
