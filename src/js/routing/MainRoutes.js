import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Tickets from '../pages/Tickets';
import CreateTicket from '../components/CreateTicket';
import Ticket from '../components/Ticket';
import Clients from '../pages/Clients';
import UserProfile from '../pages/UserProfile';
import Chat from '../pages/Chat';

class MainRoutes extends Component {
    render() {
        const { location } = this.props;
        return (
            <Switch location={location}>
                <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/tickets" component={Tickets} />
                <Route
                    path="/tickets"
                    render={({ match: { url } }) => (
                    <>
                        <Route path={`${url}/`} component={Tickets} exact />
                        <Route path={`${url}/create-ticket`} component={CreateTicket} />
                        <Route path={`${url}/:id`} component={Ticket} />
                    </>
                    )}
                />
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/user-profile" component={UserProfile} />
            </Switch>
        );
    }
}

export default withRouter(MainRoutes);
