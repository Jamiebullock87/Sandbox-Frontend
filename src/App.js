import React, { Component } from 'react';
import state from './js/state/State';
import { view } from 'react-easy-state';
import Login from './js/pages/Login';
import Main from './Main';
import AuthRoutes from './js/routing/AuthRoutes';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const COOKIES = new Cookies();

class App extends Component {
    componentDidMount() {
        document.documentElement.setAttribute('data-theme', COOKIES.get('_piedPiperTheme'));
    }
    render() {
        return state.sessionID ? <Main /> : <BrowserRouter><AuthRoutes><Login /></AuthRoutes></BrowserRouter>;
    }
}
  
export default view(App);