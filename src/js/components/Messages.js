import React, { Component } from 'react';
import { view } from 'react-easy-state';

class Messages extends Component {
    componentDidMount() {
        console.log(this.props.messages);
    }
    render() {
        return (
            <ul>
                {this.props.messages.map((msg, key) => {
                    return (
                        <li key={key}>{msg.message}</li>
                    )
                })}
            </ul>
        )
    }
}

export default view(Messages);