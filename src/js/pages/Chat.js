import React, { Component } from 'react';
import { view } from 'react-easy-state';
import 'whatwg-fetch';
import socketClient from 'socket.io-client';
const socket = socketClient('http://localhost:8000');

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messageLog: ''
        }
    }
    sendSocketIO = (e) => {
        socket.emit('message', e, (data) => {
            console.log(data);
            this.setState({messageLog: this.state.messageLog + '<li>'+data+'</li>'})
        });
    }
    render() {
        return (
            <>
                <h1>Chat Page</h1>
                <form onSubmit={() => this.sendSocketIO(this.state.message)}>
                    {this.state.messageLog}
                    <input id="message" onChange={e => {this.setState({message: e.currentTarget.value})}} type="text"/>
                    <button type="submit">Send</button>
                </form>
            </>
        )
    }
}

export default view(Chat);