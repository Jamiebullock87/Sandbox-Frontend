import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';

class Tickets extends Component {
    render() {
        return (
            <div className="Tickets page">
                <h1>Tickets</h1>
                <Link to="/tickets/create-ticket" activeClassName="selected">
                    Add New
                </Link>
            </div>
        );
    }
}

export default view(Tickets);
