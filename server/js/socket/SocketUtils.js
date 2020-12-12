class Player {
    constructor(playerSocket, playerId) {
        this.socket = playerSocket;
        this.id = playerId;

        // Id of the mission it is playing, null if in the man screen
        this.playingMissionId = null;
    }

    setSupervisor(supervisor) {
        this.supervisor = supervisor;
        if (supervisor) {
            console.log('Supervisor set!')
            supervisor.socket.emit('player-connected', this.buildPlayerState())

            this.socket.on('starting-mission', (missionId) => {
                this.playingMissionId = missionId;
                this.sendPlayerState()
            })
            this.socket.on('mission-ended', (missionId) => {
               // TODO handle mission ended (and throw event on the player side appropriatelly)
            })


            this.socket.on('disconnect', () => {
                supervisor.socket.emit('player-disconnected', this.buildPlayerState())
            })
        }
    }

    // Sends all the player state relevant data to the supervisor if present
    sendPlayerState() {
        if (this.supervisor) {
            this.supervisor.socket.emit('player-state-changed', this.buildPlayerState());
        }
    }
    buildPlayerState() {
        return {
            id: this.id,
            playingMissionId: this.playingMissionId
        }
    }
}

class Supervisor {
    constructor(supervisorSocket) {
        this.socket = supervisorSocket;
    }
}

module.exports = {
    Player, Supervisor
}