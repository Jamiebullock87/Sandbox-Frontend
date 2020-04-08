import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './js/routing/Navigation';
import MainRoutes from './js/routing/MainRoutes';
import Cookies from 'universal-cookie';
import state from './js/state/State';

const COOKIES = new Cookies();

class Main extends Component {
    componentDidMount() {
        fetch('http://localhost:8081/api/authorization', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            const email = JSON.stringify({email: state.loggedInUser.email});
            fetch('http://localhost:8081/api/users/getprofile', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: email
            })
            .then(res => res.json())
            .then(res => {
                state.loggedInUser.firstName = res.firstName;
                state.loggedInUser.lastName = res.lastName;
                state.loggedInUser.image = res.image;
                state.loggedInUser.whatTheme = res.whatTheme;
                console.log(state.loggedInUser);
                document.documentElement.setAttribute('data-theme', state.loggedInUser.whatTheme);
            })
        })
        .catch((err) => {
            state.sessionID = null;
            COOKIES.remove('_piedPiperSession');
            console.log(err);
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Navigation />
                    <div className="content">
                        <MainRoutes />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default view(Main);
