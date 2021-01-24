import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import config from '../../config';

class AddClient extends Component {
    handleInput = (val, id) => {
        console.log(id.split('-')[1]);
        state.clients.addClient[id.split('-')[1]] = val.trim();
    }
    handleSaveClient = () => {
        const body = JSON.stringify({
            identifier: state.clients.addClient.identifier,
            name: state.clients.addClient.name,
            telephone: state.clients.addClient.telephone,
            contact: state.clients.addClient.contact,
            directTelephone: state.clients.addClient.directTelephone,
            email: state.clients.addClient.email,
        });

        fetch(config.apiEndpoint + '/restricted/addclient', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
    }
    render() {
        return (
            <>  
                <h1>Add Client</h1>
                <div className="form-group">
                    <input
                        id="addclient-identifier"
                        type="text"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">identifier</label>
                </div>
                <div className="form-group">
                    <input
                        id="addclient-name"
                        type="text"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">name</label>
                </div>
                <div className="form-group">
                    <input
                        id="addclient-telephone"
                        type="number"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">telephone</label>
                </div>
                <div className="form-group">
                    <input
                        id="addclient-contact"
                        type="text"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">contact</label>
                </div>
                <div className="form-group">
                    <input
                        id="addclient-directTelephone"
                        type="number"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">directTelephone</label>
                </div>
                <div className="form-group">
                    <input
                        id="addclient-email"
                        type="email"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">email</label>
                </div>
                <button onClick={this.handleSaveClient}>Save</button>
            </>
        )
    }
}

export default view(AddClient);