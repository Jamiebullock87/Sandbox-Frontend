import React, { Component } from 'react';
import { view } from 'react-easy-state';

const cardStyle = {
    border: '1px solid var(--font-color)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '20px',
    margin: '10px 0'
}
class StatCard extends Component {
    render() {
        return (
            <div style={cardStyle} className="stat-card">
                <h3>{this.props.stat}</h3>
                <h3>{this.props.value}</h3>
            </div>
        )
    }
}

export default view(StatCard);