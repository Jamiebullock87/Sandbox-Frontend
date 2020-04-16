import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';
import Chat from '../pages/Chat';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

class MainRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevDepth: this.calculateRouteDepth(this.props.location)
        }
        console.log(this.props.location);
    }
    componentWillReceiveProps() {
        this.setState({
            prevDepth: this.calculateRouteDepth(this.props.location)
        })
    }
    calculateRouteDepth(location) {
        let depth = location.pathname.split('/')[1];
        const depthOptions = [
            {val: 'dashboard', depth: 1},
            {val: 'link2', depth: 2},
            {val: 'link3', depth: 3},
            {val: 'link4', depth: 4},
            {val: 'chat', depth: 5},
            {val: 'user-profile', depth: 6},
        ];
        if (depth === "") {
            return depth = 0;
        } else {
            return depthOptions.filter(depthVal => depthVal.val === depth)[0].depth;
        }
    }
    render() {
        const { location } = this.props;
        console.log(location);
        const timeout = {
            enter: 500,
            exit: 500
        };
        console.log(location);
        return (
            <TransitionGroup className="transition-wrapper">
                <CSSTransition key={location.key} timeout={timeout} classNames="page-slide" mountOnEnter={false} unmountOnExit={true}>
                    <div className={this.calculateRouteDepth(location) - this.state.prevDepth >= 0 ? "left" : "right"}>
                        <Switch location={location}>
                            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/chat" component={Chat} />
                            <Route exact path="/user-profile" component={UserProfile} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default withRouter(MainRoutes);
