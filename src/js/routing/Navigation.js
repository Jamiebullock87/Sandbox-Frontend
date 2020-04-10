import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import state from '../state/State';

const COOKIES = new Cookies();

class Navigation extends Component {
    handleSignOut() {
        fetch('http://localhost:8081/api/users/logout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionID}`
            },
        })
        COOKIES.remove('_piedPiperSession');
        COOKIES.remove('_piedPiperTheme');
        state.sessionID = null;
    }
    render() {
        return (
        <div className="navigation">
            <i className="navigation-logo fas fa-2x fa-crosshairs"></i>
            <NavLink to="/dashboard" activeClassName="selected">
                <i className="fas fa-2x fa-laptop-code" />
            </NavLink>
            <NavLink to="/link2" activeClassName="selected">
                <i className="fas fa-2x fa-poo-storm" />
            </NavLink>
            <NavLink to="/link3" activeClassName="selected">
                <i className="fas fa-2x fa-meteor" />
            </NavLink>
            <NavLink to="/link4" activeClassName="selected">
                <i className="fas fa-2x fa-rocket" />
            </NavLink>
            <NavLink to="/chat" activeClassName="selected">
                <i className="far fa-2x fa-comments"></i>
            </NavLink>
            <NavLink to="/user-profile" activeClassName="selected">
                <i className="fas fa-2x fa-user-astronaut" />
            </NavLink>
            <NavLink exact to="/" activeClassName="selected" >
                <i onClick={this.handleSignOut} className="fas fa-2x fa-sign-out-alt" />
            </NavLink>
        </div>
        );
    }
}

export default Navigation;
