import React, { Component } from 'react';
import { view } from 'react-easy-state';
// import state from '../state/State';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default view(Dashboard);
