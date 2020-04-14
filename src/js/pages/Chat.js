import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import Messages from '../components/Messages';
// import socketClient from 'socket.io-client';
// const socket = socketClient('http://localhost:8000');

class Chat extends Component {
    // New Websocket implementation
    
    ws = new WebSocket('ws://localhost:8000/')
    connectToWebSocket() {
        this.ws.onopen = () => {
            console.log('connected');
        }
    }
    componentDidMount() {
        // New and Shiny
        this.ws.onmessage = (e) => {
            console.log(e.data)
            state.chat.chatHistory.push(e.data);
            console.log(state.chat.chatHistory);
        }
        this.ws.onclose = (e) => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function() {
                this.connectToWebSocket();
            }, 1000);
        };
        
        this.ws.onerror = (err) => {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            this.ws.close();
        };
            
        // Old Implementation
        // socket.on("user connected", function(user) {
        //     state.chat.chatHistory.push(user + 'Connected');
        // });
        // socket.on('chat-message', function(msg) {
        //     console.log(msg);
        //     state.chat.chatHistory.push(msg);
        //     console.log(state.chat);
        // });
        // console.log(state.chat.inputMsg);
    }
    componentWillUnmount() {
        state.chat.inputMsg = '';
    }
    sendSocketIO = (e) => {
        e.preventDefault();
        this.ws.send(state.chat.inputMsg)
        state.chat.inputMsg = '';
    }
    render() {
        return (
            <>
                <h1>Chat Page</h1>
                <form onSubmit={(e) => this.sendSocketIO(e)}>
                    <Messages messages={state.chat.chatHistory} />
                    <div className="chat-input-wrapper">
                        <input className="chat-input" id="message" value={state.chat.inputMsg} onChange={e => {state.chat.inputMsg = e.currentTarget.value}} type="text"/>
                        <button className="chat-send" type="submit">Send</button>
                    </div>
                </form>
            </>
        )
    }
}

export default view(Chat);