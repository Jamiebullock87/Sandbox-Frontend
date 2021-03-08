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
            if (state.loggedInUser.firstName === null) {
                state.updateName = true;
                console.log(state.updateName);
            }
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        let body;
        
        // Handle upload of images if they have been edited
        // TODO - Needs to be async... needs figuring out
        const file = new FormData();
        file.append('file', state.editUser.image);
        file.append('filename', state.editUser.image.name);
        console.log(file);
        if (state.editUser.image !== null) {
            fetch(config.apiEndpoint + '/restricted/uploadimage', {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${state.sessionID}`
                },
                body: file
            }).then((response) => {
                response.json().then((body) => {
                    console.log(`http://localhost:8000/${body.file}`);
                });
            });
        }

        if (state.updateName) {
            body = JSON.stringify({
                firstName: state.editUser.firstName,
                lastName: state.editUser.lastName,
                email: state.loggedInUser.email,
                image: state.editUser.image,
                whatTheme: state.loggedInUser.whatTheme,
            })
        } else {
            body = JSON.stringify({
                firstName: state.loggedInUser.firstName,
                lastName: state.loggedInUser.lastName,
                email: state.loggedInUser.email,
                image: state.editUser.image,
                whatTheme: state.loggedInUser.whatTheme,
            })
        }
        console.log(body);
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
            console.log(res);
            state.loggedInUser.firstName = res.firstName;
            state.loggedInUser.lastName = res.lastName;
            state.loggedInUser.email = res.email;
            state.loggedInUser.image = res.image;
            state.loggedInUser.whatTheme = res.whatTheme;
            state.updateName = false;
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
    handleFileChange = (e) => {
        state.editUser.image = e.target.files[0];
        console.log(state.editUser.image);
        console.log(state.editUser.image.name);
    }
    render() {
        console.log(state.updateName);
        return (
            <div className="page">
                <h1>User Profile</h1>
                <div className="user-profile">
                    <div>
                        {state.loggedInUser.firstName !== null ? 
                            <>
                                <h2>Welcome back {state.loggedInUser.firstName} {state.loggedInUser.lastName}</h2>
                                <button onClick={() => state.updateName = !state.updateName}>Change Name?</button>
                            </>
                            :
                            <UpdateName />
                        }
                        {state.updateName ?
                            <>
                                <UpdateName />
                            </>
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
                        <input className="file-input" id="profile-img" name="profile-img" type="file" accept="image/png, image/jpeg" onChange={this.handleFileChange}/>
                        <label className="file-input-label" htmlFor="profile-img">Upload / Change</label>
                    </div>
                </div>
                <button className="btn-main" onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}

export default view(UserProfile);