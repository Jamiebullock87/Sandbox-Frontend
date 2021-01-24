import React, { Component } from 'react';
import { view } from 'react-easy-state';
// import { Link } from 'react-router-dom';
import state from '../state/State';
// import Loader from '../generic/Loader';
import RadioSelector from '../generic/RadioSelector';
import UpdateName from '../components/UpdateName';
import Cookies from 'universal-cookie';
import config from '../../config';

const COOKIES = new Cookies();

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            updateName: false
        }
    }
    componentDidMount() {
        // Get currently logged in user profile
        fetch(config.apiEndpoint + '/restricted/getprofile', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(res => res.json())
        .then(res => {
            // Set local state with whats fetched from the db and hence whats on this page
            state.loggedInUser.firstName = res.firstName;
            state.loggedInUser.lastName = res.lastName;
            state.loggedInUser.email = res.email;
            state.loggedInUser.image = res.image;
            state.loggedInUser.whatTheme = res.whatTheme;
        })
    }

    handleSave = () => {
        let body;
        if (this.state.updateName) {
            body = JSON.stringify({
                firstName: state.editUser.firstName,
                lastName: state.editUser.lastName,
                email: state.loggedInUser.email,
                image: state.loggedInUser.image,
                whatTheme: state.loggedInUser.whatTheme,
            })
        } else {
            body = JSON.stringify({
                firstName: state.loggedInUser.firstName,
                lastName: state.loggedInUser.lastName,
                email: state.loggedInUser.email,
                image: state.loggedInUser.image,
                whatTheme: state.loggedInUser.whatTheme,
            })
        }
        fetch(config.apiEndpoint + '/restricted/saveprofile', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(res => {
            state.loggedInUser.firstName = res.firstName;
            state.loggedInUser.lastName = res.lastName;
            state.loggedInUser.email = res.email;
            state.loggedInUser.image = res.image;
            state.loggedInUser.whatTheme = res.whatTheme;
            let cookieOpts;
            if (config.nodeEnv === 'production') {
                cookieOpts = {
                    secure: true,
                    httpOnly: true
                }
            } else if (config.nodeEnv === 'development') {
                cookieOpts = {
                    secure: false,
                    httpOnly: false
                }
            }
            COOKIES.set('_piedPiperTheme', res.whatTheme, cookieOpts);
            document.documentElement.setAttribute('data-theme', COOKIES.get('_piedPiperTheme'));
        })
    }
    render() {
        return (
            <div className="page">
                <h1>User Profile</h1>
                <div className="user-profile">
                    <div>
                        {state.loggedInUser.firstName ? 
                            <>
                            <h2>Welcome back {state.loggedInUser.firstName} {state.loggedInUser.lastName}</h2>
                            <button onClick={() => this.setState(prevState => ({updateName: !prevState.updateName}))}>Change Name?</button>
                            </>
                            :
                            <UpdateName />
                        }
                        {this.state.updateName ? 
                            <UpdateName />
                            :
                            ''
                        }
                        
                        <RadioSelector
                            heading="Preferred Theme"
                            name="theme"
                            options={[
                            { text: 'Dark', value: 'dark' },
                            { text: 'Light', value: 'light' }
                            ]}
                            onChange={e => { state.loggedInUser.whatTheme = e }}
                            default={state.loggedInUser.whatTheme}
                        />
                    </div>
                    <div>
                        <img loading="lazy" src={state.loggedInUser.image != null && state.loggedInUser.image.length > 0 ? state.loggedInUser.image : 'https://via.placeholder.com/200x250'} alt=""/>
                        <input className="file-input" id="profile-img" name="profile-img" type="file"/>
                        <label className="file-input-label" htmlFor="profile-img">Upload / Change</label>
                    </div>
                </div>
                <button className="btn-main" onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}

export default view(UserProfile);