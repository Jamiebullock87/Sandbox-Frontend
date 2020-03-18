import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div
        className={`app-loader-con ${
          this.props.className ? this.props.className : ''
        }`}
        style={{
          height: this.props.height ? this.props.height : '100%',
          background: this.props.colour ? this.props.colour : '#111516',
          position: this.props.relative
            ? 'relative'
            : this.props.absolute
            ? 'absolute'
            : 'fixed'
        }}
      >
        {this.props.textOverride ? (
          <div className="app-loader-text">{this.props.textOverride}</div>
        ) : (
          <div
            style={{
              top: `calc(50% - 2.5px - ${(this.props.top ? this.props.top : 0) /
                2}px)`
            }}
            className="app-loader"
          />
        )}
      </div>
    );
  }
}
