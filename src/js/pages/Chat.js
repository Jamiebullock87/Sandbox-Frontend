import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import socketClient from 'socket.io-client';
import Messages from '../components/Messages';
const socket = socketClient('http://localhost:8000');

class Chat extends Component {
    componentDidMount() {
        socket.on('message', function(msg){
            console.log(msg);
            state.chat.chatHistory.push(msg);
            console.log(state.chat);
        });
    }
    sendSocketIO = (e, msg) => {
        e.preventDefault();
        socket.emit('message', msg, (data) => {
            console.log(this.state);
        });
    }
    render() {
        return (
            <>
                <h1>Chat Page</h1>
                <form onSubmit={(e) => this.sendSocketIO(e, state.chat.inputMsg)}>
                    <Messages messages={state.chat.chatHistory} />
                    <input id="message" onChange={e => {state.chat.inputMsg = e.currentTarget.value}} type="text"/>
                    <button type="submit">Send</button>
                </form>
            </>
        )
    }
}

export default view(Chat);