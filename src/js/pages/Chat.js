import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import socketClient from 'socket.io-client';
import Messages from '../components/Messages';
const socket = socketClient('http://localhost:8000');

class Chat extends Component {
    componentDidMount() {
        socket.on("user connected", function(user) {
            state.chat.chatHistory.push(user + 'Connected');
        });
        socket.on('chat-message', function(msg) {
            console.log(msg);
            state.chat.chatHistory.push(msg);
            console.log(state.chat);
        });
        console.log(state.chat.inputMsg);
    }
    componentWillUnmount() {
        state.chat.inputMsg = '';
        socket.emit('disconnect');
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
            <>
                <h1>Chat Page</h1>
                <form onSubmit={(e) => this.sendSocketIO(e, state.chat.inputMsg)}>
                    <Messages messages={state.chat.chatHistory} />
                    <div className="chat-input-wrapper">
                        <input className="chat-input" id="message" onChange={e => {state.chat.inputMsg = e.currentTarget.value}} type="text"/>
                        <button className="chat-send" type="submit">Send</button>
                    </div>
                </form>
            </>
        )
    }
}

export default view(Chat);