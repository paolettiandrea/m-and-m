const store = new Vuex.Store({
    state: {
        socket: null,
        players: {}
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