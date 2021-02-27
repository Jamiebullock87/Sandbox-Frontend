import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import config from '../../config';

class CreateTicket extends Component {
    componentDidMount() {
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
            state.tickets.clients = res.clients;
        })
    }
    handleInput = (val, id) => {
        state.tickets.create[id.split('-')[1]] = val.trim();
    }
    handleCreateTicket = () => {
        const mailFields = {
            to: state.tickets.create.to,
            subject: state.tickets.create.subject,
            message: state.tickets.create.message
        }
        const encoded = Object.keys(mailFields).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mailFields[key])).join('&');
        fetch(config.apiEndpoint + '/restricted/createticket', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encoded
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.msg);
            this.props.history.push('/tickets');
        })
    }
    render() {
        return (
            <>  
                <div className="form-group">
                    <input
                        id="ticket-title"
                        type="text"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">Title</label>
                </div>
                <div className="form-group">
                    <input
                        id="ticket-to"
                        type="email"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">To</label>
                </div>
                <div className="form-group">
                    <input
                        id="ticket-raised"
                        type="email"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">Raised By</label>
                </div>
                <div className="form-group">
                    <input
                        id="ticket-subject"
                        type="text"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">Subject</label>
                </div>
                <div className="form-group">
                    <select className="form-input" name="ticket-client" id="ticket-client" onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}>
                        {state.tickets.clients.map((client, key) => {
                            return (
                                <option key={key} value={client.value}>{client.name}</option>
                            )
                        })}
                    </select>
                    <label className="form-label">Client</label>
                </div>
                <div className="form-group">
                    <textarea
                        id="ticket-brief"
                        className="form-input"
                        required
                        onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                    />
                    <label className="form-label">Brief</label>
                </div>
                <textarea id="ticket-message" className="form-input" defaultValue="Hi , 
                    We have received your support request. A member of our team is dealing with your request.">
                </textarea>
                <button onClick={this.handleCreateTicket}>Create</button>
            </>
        )
    }
}

export default view(CreateTicket);