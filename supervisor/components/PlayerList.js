Vue.component('player-list', {
    template: `<div>
        <div v-for="player in unsupervisedPlayers">
            <b-badge>{{player.socketId}}</b-badge>
        </div>
    </div>`,

    computed: {
        ... Vuex.mapGetters(['unsupervisedPlayers'])
    }
})