import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import config from '../../config';
import AddClient from '../components/AddClient';

class Clients extends Component {
    componentDidMount() {
        // Get currently logged in user profile
        fetch(config.apiEndpoint + '/restricted/getclients', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(res => res.json())
        .then(res => {
            state.clients.clientList = res.clients;
        })
    }

    render() {
        return (
            <div className="Clients page">
                <h1>Clients</h1>
                <button>Add New</button>
                <AddClient />
                <div className="clients-list">
                    <div className="client-row">
                        <h3>Identifier</h3>
                        <h3>Name</h3>
                        <h3>Telephone</h3>
                        <h3>Contact</h3>
                        <h3>Direct Telephone</h3>
                        <h3>Email</h3>
                    </div>
                        {state.clients.clientList.map((client, key) => {
                            return (
                                <div key={key} className="client-row">
                                    <span>{client.identifier}</span>
                                    <span>{client.name}</span>
                                    <span>{client.telephone}</span>
                                    <span>{client.contact}</span>
                                    <span>{client.directTelephone}</span>
                                    <span>{client.email}</span>
                                </div>
                            )
                        })}
                </div>
            </div>
        );
    }
}

export default view(Clients);
