import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import state from '../state/State';
import Loader from '../generic/Loader';
import Particles from 'react-particles-js';
import Cookies from 'universal-cookie';

const COOKIES = new Cookies();

const params = {
    particles: {
        number: {
        value: 500
        },
        color: {
        value: ['#8400ff', '#EF4F55', '#F8D301', '#03A1FF', '#FF8C00']
        },
        shape: {
        type: 'circle',
        stroke: {
            width: 0,
            color: '#000000'
        },
        polygon: {
            nb_sides: 5
        }
        },
        opacity: {
        value: 1
        },
        size: {
        value: 2.5,
        random: true,
        anim: {
            enable: false,
            speed: 0.05,
            size_min: 0.1,
            sync: false
        }
        },
        line_linked: {
        enable: false
        },
        move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
        }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
        onhover: {
            enable: true,
            mode: 'repulse'
            
        },
        onclick: {
            enable: false
        },
        resize: true
        },
        modes: {
            grab: {
                line_linked: {
                    opacity: 0.1
                },
                distance: 100
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 50
            }
        }
    },
    retina_detect: true
}

class Login extends Component {
    handleSignIn = () => {
        if (state.login.email.valid && state.login.password.valid) {
            state.loading = true;
            const auth = {
                email: state.login.email.value,
                password: state.login.password.value
            }
            const encoded = Object.keys(auth).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(auth[key])).join('&');
            fetch('http://localhost:8081/api/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: encoded
            })
            .then(res => res.json())
            .then((res) => {
                if (res.success === true) {
                    state.invalidLogin = false;
                    state.sessionID = res.token;
                    COOKIES.set('_piedPiperSession', res.token);
                    state.loggedInUser.email = auth.email;
                    state.loading = false;
                } else if (res.passwordincorrect === "Password incorrect") {
                    COOKIES.remove('_piedPiperSession');
                    state.invalidLogin = true;
                    state.loading = false;
                }
            })
            .catch((err) => {
                console.log(err);
                COOKIES.remove('_piedPiperSession');
                state.invalidLogin = true;
                state.loading = false;
            })
        }
    }
    handleInput = (val, id) => {
        state[id.split('-')[0]][id.split('-')[1]].value = val.trim();
    }
    handleValidation = (val, id) => {
        if (id.split('-')[1] === 'email') {
            val.includes('@') ? state.login.email.valid = true : state.login.email.valid = false;
            if (state.login.email.valid) {
                document.getElementById(id).classList.remove('invalid');
                if (!document.getElementById(id).classList.contains('valid')) {
                    document.getElementById(id).classList.add('valid');
                }
            } else {
                document.getElementById(id).classList.remove('valid');
                if (!document.getElementById(id).classList.contains('invalid')) {
                    document.getElementById(id).classList.add('invalid');
                }
            }
        }
        if (id.split('-')[1] === 'password') {
            val.length >= 8 ? state.login.password.valid = true : state.login.password.valid = false;
            if (state.login.password.valid) {
                document.getElementById(id).classList.remove('invalid');
                if (!document.getElementById(id).classList.contains('valid')) {
                    document.getElementById(id).classList.add('valid');
                }
            } else {
                document.getElementById(id).classList.remove('valid');
                if (!document.getElementById(id).classList.contains('invalid')) {
                    document.getElementById(id).classList.add('invalid');
                }
            }
        }
    }
    render() {
        return (
        <div className="login">
            {state.loading ? (
                <Loader relative />
            ) : (
                <>
                    <div className="panel">
                        <div className="panel-header">
                            <i className="panel-logo fas fa-6x fa-crosshairs"></i>
                            <h1>Sign in</h1>
                            <h2>Enter your login details below to get started</h2>
                        </div>
                        <form className="login-form" onSubmit={this.handleSignIn}>
                            <div className="form-group">
                                <input
                                    id="login-email"
                                    onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                                    onBlur={e => this.handleValidation(e.currentTarget.value, e.currentTarget.id)}
                                    type="email"
                                    className="form-input"
                                    required
                                />
                                <label className="form-label">E-mail Address</label>
                                {!state.login.email.valid ? (
                                    <span className="invalid">
                                        <i className="fas fa-exclamation-circle" />
                                        Invalid email address
                                    </span>
                                ) : (
                                <span />
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    id="login-password"
                                    onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                                    onBlur={e => this.handleValidation(e.currentTarget.value, e.currentTarget.id)}
                                    type="password"
                                    className="form-input"
                                    required
                                />
                                <label className="form-label">Password</label>
                                {!state.login.password.valid ? (
                                    <span className="invalid">
                                        <i className="fas fa-exclamation-circle" />
                                        Invalid password, please use at least 8 characters
                                    </span>
                                ) : (
                                <span />
                                )}
                            </div>
                            <button type="submit" className="panel-button">Sign In</button>
                        </form>
                        {state.invalidLogin ? (
                            <p className="invalid">
                                <i className="fas fa-exclamation-circle" />
                                Invalid Credentials
                            </p>
                        ) : (
                        <p />
                        )}
                        <Link to="/register">
                            <p className="panel-footer">Don't have an account? Register now!</p>
                        </Link>
                    </div>
                    <Particles
                        width="100%"
                        height="100vh"
                        params={params}
                        className="particles"
                    />
                </>
            )}
      </div>
    );
  }
}

export default view(Login);
