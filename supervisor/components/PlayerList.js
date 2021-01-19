Vue.component('player-list', {
    template: `<div>
        <div v-for="player in players">
            <b-badge>{{player.id}}</b-badge>
        </div>
    </div>`,

    computed: {
        ... Vuex.mapGetters(['players'])
    }
})