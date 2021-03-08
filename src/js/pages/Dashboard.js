import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import StatCard from '../generic/StatCard';
import config from '../../config';
import Loader from '../generic/Loader';

// Todo - add some more stuff here, some cool stats and things?

// Some links to other pages?

// Maybe some realtime data with websockets

class Dashboard extends Component {
    componentDidMount() {
        fetch(config.apiEndpoint + '/restricted/getstats', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            state.dashboardStats.numberOfUsers = res.numberOfUsers.count;
            state.dashboardStats.numberLoggedIn = res.numberLoggedIn.count;
            console.log(typeof(state.dashboardStats.numberOfUsers));
            console.log(typeof(state.dashboardStats.numberLoggedIn));
            
        })
    }
    render() {
        return (
            <div className="dashboard page">
                <h1>Dashboard</h1>
                <div className="dashstat-container">
                    {state.dashboardStats.numberOfUsers != null && state.dashboardStats.numberOfUsers < 0 ? <Loader relative /> : (
                        <StatCard
                            heading="Total Number of Users"
                            value={state.dashboardStats.numberOfUsers}
                            textColor="var(--primary-color)"
                            icon="users"
                            description="Total number of registered users"
                        />
                    )}
                    {state.dashboardStats.numberLoggedIn != null && state.dashboardStats.numberLoggedIn < 0 ? <Loader relative /> : (
                        <StatCard
                            heading="Total Logged In"
                            value={state.dashboardStats.numberLoggedIn}
                            textColor="var(--secondary-color)"
                            icon="eye"
                            description="Total number of users currently logged in" 
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default view(Dashboard);
