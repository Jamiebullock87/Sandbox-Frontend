import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import state from '../state/State';
import Loader from '../generic/Loader';
import Particles from 'react-particles-js';
import Cookies from 'universal-cookie';
import config from '../../config';

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

class Register extends Component {
    handleRegister = () => {
        if (state.register.email.valid && state.register.password.valid && state.register.password2.valid) {
            state.loading = true;
            const register = {
                email: state.register.email.value,
                password: state.register.password.value,
                password2: state.register.password2.value,
            }
            const encoded = Object.keys(register).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(register[key])).join('&');
            fetch('http://localhost:8081/api/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: encoded
            })
            .then((res) => {
                console.log(res);
                const login = {
                    email: state.register.email.value,
                    password: state.register.password.value,
                }
                const encodedLogin = Object.keys(login).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(login[key])).join('&');
                console.log(login);
                fetch('http://localhost:8081/api/users/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: encodedLogin
                })
                .then(res => res.json())
                .then((res) => {
                    state.invalidLogin = false;
                    state.sessionID = res.token.split(' ')[1];
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
                    COOKIES.set('_piedPiperSession', res.token.split(' ')[1], cookieOpts);
                    state.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    state.invalidRegister = true;
                })
            })
            .catch((err) => {
                console.log(err);
                state.invalidRegister = true;
            })
        }
    }
    handleInput = (val, id) => {
        state[id.split('-')[0]][id.split('-')[1]].value = val.trim();
    }
    handleValidation = (val, id) => {
        if (id.split('-')[1] === 'email') {
            val.includes('@') ? state.register.email.valid = true : state.register.email.valid = false;
            if (state.register.email.valid) {
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
            val.length >= 8 ? state.register.password.valid = true : state.register.password.valid = false;
            if (state.register.password.valid) {
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
        if (id.split('-')[1] === 'password2') {
            val.length >= 8 ? state.register.password2.valid = true : state.register.password2.valid = false;
            if (state.register.password2.valid) {
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
        <div className="register">
            {state.loading ? (
                <Loader relative />
            ) : (
                <>
                    <div className="panel">
                        <div className="panel-header">
                        <i className="panel-logo fas fa-6x fa-crosshairs"></i>
                            <h1>Create Account</h1>
                            <h2>Enter your email and password</h2>
                        </div>
                        <div className="form-group">
                            <input
                                id="register-email"
                                onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                                onBlur={e => this.handleValidation(e.currentTarget.value, e.currentTarget.id)}
                                type="email"
                                className="form-input"
                                required
                            />
                            <label className="form-label">E-mail Address</label>
                            {!state.register.email.valid ? (
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
                                id="register-password"
                                onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                                onBlur={e => this.handleValidation(e.currentTarget.value, e.currentTarget.id)}
                                type="password"
                                className="form-input"
                                required
                            />
                            <label className="form-label">Password</label>
                            {!state.register.password.valid ? (
                                <span className="invalid">
                                    <i className="fas fa-exclamation-circle" />
                                    Invalid password, please use at least 8 characters
                                </span>
                            ) : (
                            <span />
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                id="register-password2"
                                onChange={e => this.handleInput(e.currentTarget.value, e.currentTarget.id)}
                                onBlur={e => this.handleValidation(e.currentTarget.value, e.currentTarget.id)}
                                type="password"
                                className="form-input"
                                required
                            />
                            <label className="form-label">Confirm Password</label>
                            {!state.register.password2.valid ? (
                                <span className="invalid">
                                    <i className="fas fa-exclamation-circle" />
                                    Invalid password, please use at least 8 characters
                                </span>
                            ) : (
                            <span />
                            )}
                        </div>
                        <button className="panel-button" onClick={this.handleRegister}>Register</button>
                        {state.invalidRegister ? (
                            <p className="invalid">
                                <i className="fas fa-exclamation-circle" />
                                Invalid Credentials
                            </p>
                        ) : (
                        <p />
                        )}
                        <Link to="/">
                            <p className="panel-footer">Already have an account? Sign In!</p>
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

export default view(Register);
