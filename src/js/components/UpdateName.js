import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';

class UpdateName extends Component {
    render() {
        return (
            <div className="name-input">
                <div className="form-group">
                    <input
                        id="first-name"
                        onChange={e => { state.editUser.firstName = e.currentTarget.value }}
                        type="text"
                        className="form-input"
                    />
                    <label className="form-label">First Name</label>
                </div>
                <div className="form-group">
                    <input
                        id="last-name"
                        onChange={e => { state.editUser.lastName = e.currentTarget.value }}
                        type="text"
                        className="form-input"
                    />
                    <label className="form-label">Last Name</label>
                </div>
            </div>
        )
    }
}

export default view(UpdateName);