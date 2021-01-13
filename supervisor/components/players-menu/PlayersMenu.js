Vue.component('players-menu', {
    template: `<div>
        <div v-for="player in players">
            <player-menu-card :player="player"></player-menu-card>
        </div>
    </div>`,

    computed: {
        ... Vuex.mapGetters(['players'])
    },

    methods: {
    }
})

Vue.component('player-menu-card', {
    template: `
    
            <b-card href="#" @click="playerClicked(player.id)" :class="{'selected-player-card': isPlayerSelected}">
                <template #header>
                    <h6>{{player.id}}</h6>
                </template>
            
                <div v-if="playingMissionData && playingActivityData">

                <span>{{playingMissionData.head.title}}</span> - <span>{{playingActivityData.title}}</span>
                </div>
            </b-card>
    `,

    props: {
        player: null
    },
    methods: {

        playerClicked(playerId) {
            this.$store.dispatch('selectPlayer', playerId)
            console.log('Player clicked ', playerId)
        }

    },

    computed: {
        ... Vuex.mapGetters(['missionHeads', 'missionContents', 'selectedPlayer']),

        isPlayerSelected() {
            if (this.selectedPlayer) {
                return this.player.id === this.selectedPlayer.id
            } else { return false}
        },
        playingMissionData() {
            if (this.player.playingMissionId) {
                let data = {};
                data.head = this.missionHeads[this.player.playingMissionId];
                data.content = this.missionContents[this.player.playingMissionId];
                return data;
            } else { return null; }
        },

        playingActivityData() {
            if (this.player.playingActivityId && this.playingMissionData) {
                if (this.playingMissionData.content) {
                    return this.playingMissionData.content.activities[this.player.playingActivityId];
                }
            }
            return null;
        }
    },
})

