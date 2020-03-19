import { store } from 'react-easy-state';
import Cookies from 'universal-cookie';

const COOKIES = new Cookies();

let state = store({
    currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark',
    loading: false, // uses loading screen when true
    login: {
        email: {
            value: '',
            valid: true
        },
        password: {
            value: '',
            valid: true
        },
    },
    register: {
        email: {
            value: '',
            valid: true
        },
        password: {
            value: '',
            valid: true
        },
        password2: {
            value: '',
            valid: true
        },
    },

    invalidLogin: false,
    invalidRegister: false,
    sessionID: COOKIES.get('_piedPiperSession') ? COOKIES.get('_piedPiperSession') : false,
});

export default state;
