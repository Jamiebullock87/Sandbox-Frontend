const io = require('socket.io-client')

export default function() {
    const socket = io.connect('http://localhost:8000')

    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(chatroomName, cb) {
        socket.emit('join', chatroomName, cb)
    }

    function leave(chatroomName, cb) {
        socket.emit('leave', chatroomName, cb)
    }

    function message(chatroomName, msg, cb) {
        socket.emit('message', { chatroomName, message: msg }, cb)
    }

    function getChatrooms(cb) {
        socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(cb) {
        socket.emit('availableUsers', null, cb)
    }
    return {
        register,
        join,
        leave,
        message,
        getChatrooms,
        getAvailableUsers,
        registerHandler,
        unregisterHandler
    }
}

// Handle Register
function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName))
        return callback('user is not available')
  
    const user = clientManager.getUserByName(userName)
    clientManager.registerClient(client, user)
  
    return callback(null, user)
}

// handle Event
function handleEvent(chatroomName, createEntry) {
    return ensureValidChatroomAndUserSelected(chatroomName)
    .then(function ({ chatroom, user }) {
        // append event to chat history
        const entry = { user, ...createEntry() }
        chatroom.addEntry(entry)
  
        // notify other clients in chatroom
        chatroom.broadcastMessage({ chat: chatroomName, ...entry })
        return chatroom
    })
}

// Chatroom
const members = new Map()
let chatHistory = []

function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
}

function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
}

function getChatHistory() {
    return chatHistory.slice()
}

function addUser(client) {
    members.set(client.id, client)
}

function removeUser(client) {
    members.delete(client.id)
}

function serialize() {
    return {
        name,
        image,
        numMembers: members.size
    }
}

// Handle Join
function handleJoin(chatroomName, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` })
  
    handleEvent(chatroomName, createEntry)
        .then(function (chatroom) {
            // add member to chatroom
            chatroom.addUser(client)
    
            // send chat history to client
            callback(null, chatroom.getChatHistory())
        })
        .catch(callback)
}

// Handle Disconnect
function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
}