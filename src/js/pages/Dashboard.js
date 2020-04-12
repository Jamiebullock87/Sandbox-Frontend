import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import StatCard from '../generic/StatCard';
import config from '../../config';
import Cookies from 'universal-cookie';
import Loader from '../generic/Loader';

const COOKIES = new Cookies();

class Dashboard extends Component {
    componentDidMount() {
        console.log(COOKIES.get('_piedPiperSession'));
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
            console.log(res);
            state.dashboardStats.numberOfUsers = res.numberOfUsers;
            state.dashboardStats.numberLoggedIn = res.numberLoggedIn;
            console.log(state.dashboardStats);
        })
    }
    render() {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                {state.dashboardStats.numberOfUsers != null && state.dashboardStats.numberOfUsers.length < 0 ? <Loader relative /> : (
                    <StatCard
                        stat="Total Number of Users"
                        value={state.dashboardStats.numberOfUsers}
                    />
                )}
                {state.dashboardStats.numberLoggedIn != null && state.dashboardStats.numberLoggedIn.length < 0 ? <Loader relative /> : (
                    <StatCard
                        stat="Total Logged In"
                        value={state.dashboardStats.numberLoggedIn}
                    />
                )}
            </div>
        );
    }
}

export default view(Dashboard);
