Vue.component('players-menu', {
    template: `<div>
        <div v-for="player in players">
            <b-card href="#" @click="playerClicked(player.id)">
                <template #header>
                    <h6>{{player.id}}</h6>
                </template>
                Some content
            </b-card>
        </div>
    </div>`,

    computed: {
        ... Vuex.mapGetters(['players'])
    },

    methods: {
        playerClicked(playerId) {
            this.$store.dispatch('selectPlayer', playerId)
            console.log('Player clicked ', playerId)
        }
    }
})


Vue.component('player-main-panel', {
    template: `<div>
    
    </div>`

})