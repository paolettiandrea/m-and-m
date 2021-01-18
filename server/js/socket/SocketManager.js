const {Player, Supervisor} = require('./SocketUtils.js')

let io = null;

// The active supervised rooms
let players = {}
let supervisor = null;

function initialize(server) {

    io = require('socket.io')(server);

    io.on('connection', (socket) => {

        // Supervisor
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

                socket.on('message-for-player', ({message, player}) => {
                    console.log("Message: ", message, " for player: ", player);
                    let targetPlayer = players[player];
                    targetPlayer.socket.emit('message-from-supervisor', message);
                })

                socket.on('disconnect', () => {
                    console.log('Supervisor disconnected');
                    supervisor = null;
                })

                socket.on('hint-for-player', ({playerId, hint}) => {

                    let targetPlayer = players[playerId];
                    targetPlayer.socket.emit('hint', hint);
                })
            }
        })

        // Player
        socket.on('player-handshake', (msg) => {


            let id = getUnusedPlayerId();
            players[id] = new Player(socket, id);
            if (supervisor) { players[id].setSupervisor(supervisor)}
            console.log('Player ' + id + ' connected')
            
            socket.on('message-for-supervisor', (message) => {
                if (supervisor) {
                    supervisor.socket.emit("message-from-player", {message, id})
                }
            })

            socket.on('need-hint', () => {
                if (supervisor) {
                    supervisor.socket.emit("new-pending-action", {
                        playerId: id,
                        action: {
                            type: 'hint',



                        }
                    })
                }
                console.log("Need hint")
            })

            socket.on('need-scoring', (scoringData) => {
                console.log("Player ", id, " needs scoring for ", scoringData);
                if (supervisor) {
                    supervisor.socket.emit('new-pending-action', {
                        playerId: id,
                        action: {
                            type: 'scoring',
                            scoringData: scoringData
                        }
                    })
                }
            });
            
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