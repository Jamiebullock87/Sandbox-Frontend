import React, { Component } from 'react';
import { view } from 'react-easy-state';

class StatCard extends Component {
    render() {
        return (
            <div className="stat-card">
                <h3>{this.props.heading}</h3>
                <p style={{color: `${this.props.textColor}`}}>
                {this.props.icon ? (
                    <i className={`fas fa-${this.props.icon}`} />
                ) : null}
                <span>{this.props.value !== null ? this.props.value : null}</span>
                </p>
                <span>{this.props.description}</span>
            </div>
        )
    }
}

export default view(StatCard);