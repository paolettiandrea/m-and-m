const {SupervisedRoom} = require('./SupervisedRoom.js')

let io = null;

// The active supervised rooms
let activeRooms = {}
let unsupervisedPlayers = {}


function initialize(server) {

    io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on('sup-handshake', (msg) => {
            supervisorConnectedCallback(socket);
            socket.on('disconnect', () => {
                supervisorDisconnectedCallback(socket);
            })
        })
        socket.on('player-handshake', (msg) => {
            playerConnectedCallback(socket);
            socket.on('disconnect', () => {
                playerDisconnectedCallback(socket);
            })
        })
        socket.on('disconnect', () => {
            console.log("Generic socket disconnection event")
        })
    })
}

function supervisorConnectedCallback(supSocket) {
    supSocket.join('supervisors');
    activeRooms[supSocket.id] = new SupervisedRoom(supSocket);
    // for (const unsuPlayer in unsupervisedPlayers) {
    //     supSocket.emit('player-connected', unsuPlayer.model);
    // }
    console.log('New supervisor connected');
}

function supervisorDisconnectedCallback(supSocket) {
    console.log('Supervisor disconnected');
}

function playerConnectedCallback(playerSocket) {
    playerSocket.join('players');
    let newPlayer = {
        socket: playerSocket,
        model: {
            socketId: playerSocket.id
        }
    }
    unsupervisedPlayers[playerSocket.id] = newPlayer;
    io.in('supervisors').emit('player-connected', newPlayer.model);
}

function playerDisconnectedCallback(playerSocket) {
    console.log('Player disconnected');
    io.in('supervisors').emit('player-disconnected', {socketId: playerSocket.id});
}


module.exports = {
    initialize
}