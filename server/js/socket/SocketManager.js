var activeSockets = {
    supervisors: {},
    players: {}
}

let supervisor = null;
let unsupervisedPlayers = {}

class SupervisorSocket {
    constructor(socket) {
        console.log("New supervisor!")
        socket.join('supervisors');
    }
}

class PlayerSocket {
    constructor(socket) {
        this.socket = socket;
        socket.join('players');
    }

    assignSupervisor(supervisor) {
        this.supervisor = supervisor;
}

    id() { return this.socket.id; }
}

class SupervisedRoom {
    constructor(supervisorSocket) {
        this.supervisor = supervisorSocket;
        this.players = {}

        this.supervisor.join(supervisorSocket.id)
    }
}

function initialize(server) {

    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on('sup-handshake', (msg) => {
            supervisor = new SupervisorSocket(socket);
        })
        socket.on('player-handshake', (msg) => {
            let newPlayer = new PlayerSocket(socket);

            if (supervisor) {
                newPlayer.assignSupervisor(supervisor);
            }
            unsupervisedPlayers[newPlayer.id()] = newPlayer;
        })
        socket.on('disconnect', () => {
            console.log("Generic socket disconnection event")
        })
        activeSockets.supervisors[socket.id] = socket;
    })


    // Initialize supervisor namespace


    // io.on('connection', (socket) => {
    //     console.log('A user connected')
    //     socket.on('disconnect', () => {
    //         console.log("A user disconnected");
    //     });
    // });
}

module.exports = {
    initialize
}