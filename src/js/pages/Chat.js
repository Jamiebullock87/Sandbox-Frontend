import React, { Component } from 'react';
import { view } from 'react-easy-state';
import 'whatwg-fetch';
// import socketClient from 'socket.io-client';
import Messages from '../components/Messages';
// const socket = socketClient('http://localhost:8000');

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            chatHistory: [],
            input: ''
        }
    }
    sendSocketIO = (e, msg) => {
        // e.preventDefault();
        // socket.emit('message', msg, (data) => {
        //     console.log(data);
        //     this.setState(state => {
        //         const chatHistory = [...state.chatHistory, data];
        //         return {
        //             chatHistory,
        //             input: '',
        //         };
        //     });
        //     console.log(this.state);
        // });
    }
    render() {
        return (
            <>
                <h1>Chat Page</h1>
                <form onSubmit={(e) => this.sendSocketIO(e, this.state.message)}>
                    <Messages messages={this.state.chatHistory} />
                    <input id="message" onChange={e => {this.setState({message: e.currentTarget.value})}} type="text"/>
                    <button type="submit">Send</button>
                </form>
            </>
        )
    }
}

export default view(Chat);