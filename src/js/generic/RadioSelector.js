import React, { Component } from 'react';

class RadioSelector extends Component {
    render() {
        return (
        <div className="radio-selection">
            <h4>{this.props.heading}</h4>
            {this.props.options.map((x, i) => {
            return (
                <div key={i}>
                <input
                    type="radio"
                    id={this.props.name + '-' + x.value}
                    value={x.value}
                    name={this.props.name}
                    onChange={e => this.props.onChange(e.currentTarget.value)}
                    defaultChecked={this.props.default === x.value}
                />
                <label htmlFor={this.props.name + '-' + x.value}>{x.text}</label>
                </div>
            );
            })}
        </div>
        );
    }
}

export default RadioSelector;
