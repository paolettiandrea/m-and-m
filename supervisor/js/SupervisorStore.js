const store = new Vuex.Store({
    state: {
        socket: null,
        // The state of the players
        players: {},
        selectedPlayerId: null,

        missionHeads: {},
        missionContents: {},
    },
    actions: {
        initializeSupervisorStore(context) {
            context.commit('initializeSocket');
            context.commit('loadMissions');
        },

        selectPlayer(context, playerId) {
            context.commit('setSelectedPlayer', playerId)
        }
    },
    mutations: {
        loadMissions(state) {
            axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;
                state.missionHeads = JSON.parse(res.data);
                console.log("Loaded mission heads: ", state.missionHeads)
                for (const missionId in state.missionHeads) {
                    axios.get("/missions/content/" + missionId).then( (res, err) => {
                        if (err) throw err;
                        state.missionContents[missionId] = JSON.parse(res.data);
                    })
                }
            })
        },
        setSelectedPlayer(state, playerId) {
            state.selectedPlayerId = playerId;
        },
        initializeSocket(state) {
            // Initialize the socket to the player and send the handshake
            state.socket = io();
            state.socket.emit('sup-handshake');

            state.socket.on('player-state-changed', (player) => {
                console.log("Player state changed socket event: ", player);
                store.commit('playerStateChanged', player);
            })

            state.socket.on('player-connected', (player) => {
                console.log('Player connected', player)
                store.commit('playerConnected', player);
            })

            state.socket.on('player-disconnected', (player) => {
                store.commit('playerDisconnected', player);
            })
        },

        playerConnected(state, player) {
            Vue.set(state.players, player.id, player)
        },

        playerStateChanged(state, playerState) {
            Vue.set(state.players, playerState.id, playerState)
        },

        playerDisconnected(state, player) {
                Vue.delete(state.players, player.id);
        }
    },

    getters: {

        players(state) {
            return state.players;
        },
        
        missionContents(state) { return state.missionContents; },
        missionHeads(state) { return state.missionHeads; },
        


        selectedPlayer(state) {
            return state.players[state.selectedPlayerId];
        },

        selectedPlayerMissionId(state, getters) {
            return getters.selectedPlayer.playingMissionId;
        },

        selectedPlayerMissionHead(state, getters) {
            if (getters.selectedPlayerMissionId) {
                return state.missionHeads[getters.selectedPlayerMissionId]
            } else { return null; }
        },
        selectedPlayerMissionContent(state, getters) {
            if (getters.selectedPlayerMissionId) {
                return state.missionContents[getters.selectedPlayerMissionId]
            } else { return null; }
        },
        selectedPlayerActivity(state, getters) {
            let activityId = getters.selectedPlayer.playingActivityId;
            if (activityId) {
                return getters.selectedPlayerMissionContent.activities[activityId]
            } else { return null; }  
        }
    }
})

store.dispatch('initializeSupervisorStore')

export default store;