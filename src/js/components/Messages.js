import React, { Component } from 'react';
import { view } from 'react-easy-state';

class Messages extends Component {
    componentDidMount() {
        console.log('MessagesComponent', this.props.messages);
    }
    render() {
        return (
            <ul className="chat-messages">
                {this.props.messages.map((msg, key) => {
                    return (
                        <li key={key}>{msg}</li>
                    )
                })}
            </ul>
        )
    }
}

export default view(Messages);