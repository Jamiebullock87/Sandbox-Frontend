import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import Messages from '../components/Messages';
import config from '../../config';
import socketClient from 'socket.io-client';

const socket = socketClient('http://localhost:8000', {
    autoConnect: false,
    forceNew: true
});

class Chat extends Component {
    componentDidMount() {

        socket.open();
        fetch(config.apiEndpoint + '/restricted/getprofile', {
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
            // Set local state with whats fetched from the db and hence whats on this page
            state.loggedInUser.firstName = res.firstName;
            state.loggedInUser.lastName = res.lastName;
            console.log(state.loggedInUser);
        })
        socket.on('chat-message', function(msg) {
            console.log(msg);
            if (msg !== 'User Disconnected') {
                state.chat.chatHistory.push(msg);
            }
            console.log(state.chat);
        });
    }
    componentWillUnmount() {
        state.chat.inputMsg = '';
        state.chat.chatHistory = [];
        console.log(state.chat.chatHistory);
        socket.emit('terminate');
        socket.disconnect(0);
        socket.disconnect();
    }
    sendSocketIO = (e, msg) => {
        e.preventDefault();
        socket.emit('chat-message', msg, (data) => {
            console.log(this.state);
        });
        state.chat.inputMsg = '';
    }
    render() {
        return (
            <div className="page">
                <h1>Chat Page</h1>
                <form onSubmit={(e) => this.sendSocketIO(e, state.chat.inputMsg)}>
                    <Messages messages={state.chat.chatHistory} />
                    <div className="chat-input-wrapper">
                        <input className="chat-input" id="message" value={state.chat.inputMsg} onChange={e => {state.chat.inputMsg = e.currentTarget.value}} type="text"/>
                        <button className="chat-send" type="submit">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default view(Chat);