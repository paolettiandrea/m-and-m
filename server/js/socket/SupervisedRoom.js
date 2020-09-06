class SupervisedRoom {
    constructor(supervisorSocket) {
        // The socket of the supervisor that is assigned to this room
        this.supSocket = supervisorSocket;
        // A dictionary of the players that are in this room keyed by their socket index
        this.playerSockets = {}
    }

    addPlayer(playerSocket) {
        this.playerSockets[playerSocket.id] = playerSocket;
    }
}

module.exports = {
    SupervisedRoom
}