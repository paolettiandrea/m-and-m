const store = new Vuex.Store({
    state: {
        socket: null,
        players: {},
        selectedPlayerId: null
    },
    actions: {
        initializeSupervisorStore(context) {
            context.commit('initializeSocket');
        },

        selectPlayer(context, playerId) {
            context.commit('setSelectedPlayer', playerId)
        }
    },
    mutations: {
        setSelectedPlayer(state, playerId) {
            state.selectedPlayerId = playerId;
        },
        initializeSocket(state) {
            state.socket = io();
            state.socket.emit('sup-handshake');

            state.socket.on('player-state-changed', (player) => {
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
        }
    }
})

store.dispatch('initializeSupervisorStore')

export default store;