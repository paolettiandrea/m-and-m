class Player {
    constructor(playerSocket, playerId) {
        this.socket = playerSocket;
        this.id = playerId
    }

    setSupervisor(supervisor) {
        this.supervisor = supervisor;
        if (supervisor) {
            console.log('Supervisor set!')
            supervisor.socket.emit('player-connected', this.buildPlayerState())
            this.socket.on('disconnect', () => {
                supervisor.socket.emit('player-disconnected', this.buildPlayerState())
            })
        }
    }

    // Sends all the player state relevant data to the supervisor if present
    buildPlayerState() {
        return {
            id: this.id,
        }
    }



}
class Supervisor {
    constructor(supervisorSocket) {
        console.log('Supervisor connected')
        this.socket = supervisorSocket;
    }


}

module.exports = {
    Player, Supervisor
}