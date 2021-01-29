
const store = new Vuex.Store({
    state: {
        socket: null,
        // The state of the players
        players: {},
        selectedPlayerId: null,

        missionHeads: {},
        missionContents: {},

        chats: {},

        pendingActions: {}
    
    },
    actions: {
        initializeSupervisorStore(context) {
            context.commit('initializeSocket');
            context.commit('loadMissions');
        },

        selectPlayer(context, playerId) {
            context.commit('setSelectedPlayer', playerId)
        },

        sendSelectedPlayerMessage(context, message) {
            context.commit('sendPlayerMessage', {message: message, player: context.getters.selectedPlayer.id})
        },
    },
    mutations: {

        removePendingHint(state, playerId) {
            let playerPending = state.pendingActions[playerId];
            playerPending.hint = false;
        },
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
            state.chats = {};

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

            state.socket.on('message-from-player', ({message, id}) => {
                console.log("Message from player", message, id);
                state.chats[id].messages.push({author: id, body: message});
            }) 

            state.socket.on('new-pending-action', ({playerId, action}) => {
                console.log("New pending action:", playerId, action);
               
                let playerPendingActions = state.pendingActions[playerId];
                switch (action.type) {
                    case 'hint': {
                        if (!playerPendingActions.hint) {
                            playerPendingActions.hint = true;
                        }
                        break;
                    }
                    case 'scoring': {
                        playerPendingActions.scoring.push(action.scoringData);
                    }
                }

            }) 
        },

        sendPlayerMessage(state, {message, player}) {
            console.log("Sending message");
            state.socket.emit('message-for-player', {message, player});

            state.chats[player].messages.push({author: 'supervisor', body: message})
        },

        playerConnected(state, player) {
            Vue.set(state.players, player.id, player)
            state.players[player.id].lastStateChangeTime = Date.now();
            Vue.set(state.chats, player.id, {
                messages: []
            })

            Vue.set(state.pendingActions, player.id, {
                hint: false,
                scoring: []
            })
        },

        playerStateChanged(state, playerState) {

            let previousState = state.players[playerState.id];
            let givenName = previousState.givenName;
            if (givenName) { playerState.givenName = givenName; }
            if (previousState.playingActivityId!==playerState.playingActivityId) {

                // Remove pending hint if present
                if (state.pendingActions[playerState.id].hint) {
                    console.log("Removing pending hint")
                    state.pendingActions[playerState.id].hint = false;
                }
            }

            Vue.set(state.players, playerState.id, playerState)
            state.players[playerState.id].lastStateChangeTime = Date.now();
        },

        playerDisconnected(state, player) {
                Vue.delete(state.players, player.id);
                Vue.delete(state.chats, player.id)
                Vue.delete(state.pendingActions, player.id)
        }
    },

    getters: {

        players(state) {
            return state.players;
        },

        pendingActions(state) { return state.pendingActions},

        socket(state) { return state.socket; },

        selectedPlayerChat(state) { return state.chats[state.selectedPlayerId]},
        
        missionContents(state) { return state.missionContents; },
        missionHeads(state) { return state.missionHeads; },
        

        selectedPlayerPendingActions(state, getters) {
            return state.pendingActions[state.selectedPlayerId]
        },

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