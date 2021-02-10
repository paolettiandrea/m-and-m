const {Player, Supervisor} = require('./SocketUtils.js')
const {getMissionRankings, addMissionScore, getMissionRankingsLastHour} = require('../altDbController.js')

let io = null;

// The active supervised rooms
let players = {}
let supervisor = null;

let groups = {}


function addPlayerToGroup(player, groupId) {
    if (!groups[groupId]) {
        groups[groupId] = {
            players: [],
            score: 0
        }
    }

    let targetPlayer = players[player];
    targetPlayer.setGroup(groupId);
    groups[groupId].players.push(player);
    console.log("Adding player to group", groupId, ": ", groups[groupId])
    console.log("Groups now: ", groups);
}


function removePlayerFromGroup(playerId, groupId) {
    // TODO
    
    let targetPlayer = players[playerId];
    let targetGroup = groups[targetPlayer.group]
    
    if (targetGroup) {
        const index = array.indexOf(playerId);
        if (index > -1) {
          array.splice(index, 1);
        }
    }
}


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


                socket.on('player-scored', ({playerId, scoreData}) => {
                    console.log("Scored ", scoreData);
                    let targetPlayer = players[playerId];
                    targetPlayer.socket.emit('scored', scoreData);
                })

                socket.on('player-grouped', ({playerId, groupId}) => {
                    console.log("Player grouped event for player", playerId, " and group ", groupId)
                    let targetPlayer = players[playerId];
                    addPlayerToGroup(playerId, groupId);
                    // supervisor.socket.emit('player-state-changed', targetPlayer)
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


            socket.on('class-mission-ended', (score) => {

                let targetPlayer = players[id];
                getMissionRankingsLastHour(targetPlayer.playingMissionId).then((rankings) => {

                    console.log("Adding ranking to mission recap")
                    console.log(rankings);
                    let missionRecap = {
                        playTime: (Date.now() - targetPlayer.connectionTime)/1000,
                        rankings: rankings
                    }
                    targetPlayer.socket.emit('mission-recap', missionRecap)

                })
            })


            socket.on('mission-ended', (score) => {
                let targetPlayer = players[id];
                console.log('Player has ended a mission: ', targetPlayer);

                targetPlayer.missionDone = true;

                if (targetPlayer.group !== undefined) {
                    console.log(groups, 'key', targetPlayer.group);
                    let targetGroup = groups[targetPlayer.group];
                    targetGroup.score += score;
                    console.log("The player that finished the mission is part of group ", targetGroup);

                    let groupDone = true;
                    for (i of targetGroup.players) {
                        let targetPlayer = players[i];
                        if (!targetPlayer.missionDone) {
                            groupDone = false;
                            break;
                        }
                    }

                    if (groupDone) {
                        for (i of targetGroup.players) {
                            let targetPlayer = players[i];
                            getMissionRankings(targetPlayer.playingMissionId).then((rankings) => {
                                let missionRecap = {
                                    groupScore: targetGroup.score,
                                    rankings: rankings
                                }
                                targetPlayer.socket.emit('mission-recap-group', missionRecap);

                            })
                        }
                    } else {
                        targetPlayer.socket.emit('wait-for-group');
                    }

                } else {
                    // Single player
                    getMissionRankings(targetPlayer.playingMissionId).then((rankings) => {

                    console.log("Adding ranking to mission recap")
                    console.log(rankings);
                    let missionRecap = {
                        playTime: (Date.now() - targetPlayer.connectionTime)/1000,
                        rankings: rankings
                    }
                    targetPlayer.socket.emit('mission-recap', missionRecap)
                })
                }


                
            })

            socket.on('new-score', (score) => {
                console.log("Received new score: ", score);
                let targetPlayer = players[id];
                addMissionScore(targetPlayer.playingMissionId, score);
            })
            
            socket.on('disconnect', () => {
                console.log('Player ' + id + ' disconnected')

                let targetPlayer = players[id];
                if (targetPlayer.group) {
                    removePlayerFromGroup(id, targetPlayer.group);
                }
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