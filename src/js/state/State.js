import { store } from 'react-easy-state';
import Cookies from 'universal-cookie';

const COOKIES = new Cookies();

let state = store({
    // Global Stuff
    currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark',
    loading: false, // uses loading screen when true

    // Auth
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

    // User Profile
    updateName: false,
    editUser: {
        firstName: null,
        lastName: null,
        image: null
    },
    loggedInUser: {
        firstName: null,
        lastName: null,
        email: '',
        image: '',
        whatTheme: 'dark'
    },

    // Dashboard Stats
    dashboardStats: {
        numberOfUsers: null,
        numberLoggedIn: null,
        userRegChart: []
    },

    // Chat
    chat: {
        inputMsg: '',
        chatHistory: []
    },

    tickets: {
        clients: [
            {value: 'client-1', name: 'Client 1'},
            {value: 'client-2', name: 'Client 2'},
            {value: 'client-3', name: 'Client 3'},
        ],
        create: {
            title: '',
            to: '',
            raised: '',
            subject: '',
            client: '',
            brief: '',
            message: '',
        }
    },

    clients: {
        addClient: {
            identifier: '',
            name: '',
            telephone: 0,
            contact: '',
            directTelephone: 0,
            email: ''
        },
        clientList: []
    }

});

export default state;
