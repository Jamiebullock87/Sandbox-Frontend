import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './js/routing/Navigation';
import MainRoutes from './js/routing/MainRoutes';

class Main extends Component {
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
