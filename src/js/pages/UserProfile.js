import React, { Component } from 'react';
import { view } from 'react-easy-state';
// import { Link } from 'react-router-dom';
import state from '../state/State';
// import Loader from '../generic/Loader';
import RadioSelector from '../generic/RadioSelector';
import UpdateName from '../components/UpdateName';
// import Cookies from 'universal-cookie';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            updateName: false
        }
    }
    handleSave = () => {
        const body = JSON.stringify({
            email: state.loggedInUser.email,
            firstName: state.editUser.firstName,
            lastName: state.editUser.lastName,
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
            state.loggedInUser.firstName = res.firstName;
            state.loggedInUser.lastName = res.lastName;
            document.documentElement.setAttribute('data-theme', state.loggedInUser.whatTheme);
        })
    }
    render() {
        return (
            <>
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
                                <img src="https://via.placeholder.com/200x250" alt=""/>
                                <input className="file-input" id="profile-img" name="profile-img" type="file"/>
                                <label className="file-input-label" htmlFor="profile-img">Upload / Change</label>
                            </div>
                        </div>
                        <button className="btn-main" onClick={this.handleSave}>Save</button>
            </>
        )
    }
}

export default view(UserProfile);