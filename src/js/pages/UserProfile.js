import React, { Component } from 'react';
import { view } from 'react-easy-state';
// import { Link } from 'react-router-dom';
import state from '../state/State';
// import Loader from '../generic/Loader';
import RadioSelector from '../generic/RadioSelector';
// import Cookies from 'universal-cookie';

class UserProfile extends Component {
    componentDidMount() {
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
            console.log(res);
        })
    }
    handleSave = () => {
        const body = JSON.stringify({
            email: state.loggedInUser.email,
            firstName: state.loggedInUser.firstName,
            lastName: state.loggedInUser.lastName,
            image: state.loggedInUser.image,
            whatTheme: state.loggedInUser.whatTheme
        })
        fetch('http://localhost:8081/api/users/saveprofile', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
    }
    render() {
        return (
            <>
                <h1>User Profile</h1>
                <h2>E-Mail: {state.loggedInUser.email}</h2>
                    <h2>Welcome {state.loggedInUser.firstName} {state.loggedInUser.lastName}</h2>
                        <div className="user-profile">
                            <div>
                                <div className="form-group">
                                    <input
                                        id="first-name"
                                        onChange={e => { state.loggedInUser.firstName = e.currentTarget.value; }}
                                        type="text"
                                        className="form-input"
                                    />
                                    <label className="form-label">First Name</label>
                                </div>
                                <div className="form-group">
                                    <input
                                        id="last-name"
                                        onChange={e => { state.loggedInUser.lastName = e.currentTarget.value; }}
                                        type="text"
                                        className="form-input"
                                    />
                                    <label className="form-label">Last Name</label>
                                </div>
                                <RadioSelector
                                    heading="Preferred Theme"
                                    name="theme"
                                    options={[
                                    { text: 'Dark', value: 'dark' },
                                    { text: 'Light', value: 'light' }
                                    ]}
                                    onChange={e => { state.loggedInUser.whatTheme = e }}
                                    default={"dark"}
                                />
                            </div>
                            <div>
                                <img src="https://via.placeholder.com/200x250" alt=""/>
                                <input className="file-input" id="profile-img" name="profile-img" type="file"/>
                                <label className="file-input-label" htmlFor="profile-img">Upload / Change</label>
                            </div>
                        </div>
                        <button onClick={this.handleSave}>Save</button>
            </>
        )
    }
}

export default view(UserProfile);