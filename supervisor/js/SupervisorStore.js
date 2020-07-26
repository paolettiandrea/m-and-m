const store = new Vuex.Store({
    state: {
        socket: null,
        unsupervisedPlayers: {},
        supervisedPlayers: {}
    },
    actions: {
        initializeSupervisorStore(context) {
            context.commit('initializeSocket');
        }
    },
    mutations: {
        initializeSocket(state) {
            state.socket = io();
            state.socket.emit('sup-handshake');

            state.socket.on('player-connected', (player) => {
                store.commit('addUnsupervisedPlayer', player);
            })

            state.socket.on('player-disconnected', (player) => {
                store.commit('removePlayer', player.socketId);
            })
        },

        addUnsupervisedPlayer(state, player) {
            Vue.set(state.unsupervisedPlayers, player.socketId, player)
        },

        removePlayer(state, playerId) {
            if (state.unsupervisedPlayers.hasOwnProperty(playerId)) {
                Vue.delete(state.unsupervisedPlayers, playerId);
            } else if (state.supervisedPlayers.hasOwnProperty(playerId)) {
                // TODO The player was supervised by me
            }
        }
    },

    getters: {
        supervisorSocket(state) { return state.socket; },

        unsupervisedPlayers(state) {
            return state.unsupervisedPlayers;
        }
    }
})

store.dispatch('initializeSupervisorStore')

export default store;