import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { NavLink } from 'react-router-dom';

class Tickets extends Component {
    render() {
        return (
            <div className="Tickets page">
                <h1>Tickets</h1>
                <NavLink to="/tickets/create-ticket" activeClassName="selected">
                    Add New
                </NavLink>
            </div>
        );
    }
}

export default view(Tickets);
