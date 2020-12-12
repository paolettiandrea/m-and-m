const {Player, Supervisor} = require('./SocketUtils.js')

let io = null;

// The active supervised rooms
let players = {}
let supervisor = null;

function initialize(server) {

    io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on('sup-handshake', (msg) => {
            if (supervisor) {
                console.warn('There is already a supervisor connected!')
            } else {
                console.log('Supervisor connected')
                supervisor = new Supervisor(socket)
                // Pair already present players and supervisor
                for (let id in players) {
                    players[id].setSupervisor(supervisor);
                }
                socket.on('disconnect', () => {
                    console.log('Supervisor disconnected');
                    supervisor = null;
                })
            }
        })
        socket.on('player-handshake', (msg) => {
            let id = getUnusedPlayerId();
            players[id] = new Player(socket, id);
            console.log('Player ' + id + ' connected')
            if (supervisor) { players[id].setSupervisor(supervisor)}
            socket.on('disconnect', () => {
                console.log('Player ' + id + ' disconnected')
                delete players[id]
            })
        })
        socket.on('disconnect', () => {
            console.log("Generic socket disconnection event")
        })
    })
}


function getUnusedPlayerId() {
    let counter = 0;
    while (players.hasOwnProperty(counter)) {
        counter++;
    }
    return counter;
}



module.exports = {
    initialize
}