import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './js/routing/Navigation';
import MainRoutes from './js/routing/MainRoutes';
import Cookies from 'universal-cookie';
import state from './js/state/State';

const COOKIES = new Cookies();

class Main extends Component {
    constructor() {
        super();
        state.sessionID = COOKIES.get('_piedPiperSession');
    }
    componentDidMount() {
        fetch('http://localhost:8081/api/restricted/dashboard', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('Authorized with token');
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
