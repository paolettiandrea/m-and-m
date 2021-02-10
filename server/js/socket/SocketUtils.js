class Player {
    constructor(playerSocket, playerId) {
        this.socket = playerSocket;
        this.id = playerId;
        this.supervisor = null;

        // Id of the mission it is playing, null if in the man screen
        this.playingMissionId = null;
        this.playingActivityId = null;

        this.connectionTime = Date.now();


        this.socket.on('starting-mission', (missionId) => {
            console.log("Started missione")
            this.playingMissionId = missionId;
            this.sendPlayerState()
        })

        this.socket.on('starting-activity', (activityId) => {
            console.log("Started activity")
            this.playingActivityId = activityId;
            this.sendPlayerState();
        })


        this.socket.on('disconnect', () => {
            if (this.supervisor) {
                this.supervisor.socket.emit('player-disconnected', this.buildPlayerState())
            }
        })
    }

    setSupervisor(supervisor) {
        this.supervisor = supervisor;
        if (supervisor) {
            console.log('Supervisor set!')
            supervisor.socket.emit('player-connected', this.buildPlayerState())

            // this.socket.on('mission-ended', (missionId) => {
               // TODO handle mission ended (and throw event on the player side appropriatelly)
            // })

            

        }
    }

    setGroup(groupId) { this.group = groupId}


    // Sends all the player state relevant data to the supervisor if present
    sendPlayerState() {
        if (this.supervisor) {
            this.supervisor.socket.emit('player-state-changed', this.buildPlayerState());
        }
    }
    buildPlayerState() {
        return {
            id: this.id,
            playingMissionId: this.playingMissionId,
            playingActivityId: this.playingActivityId,
            connectionTime: this.connectionTime
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