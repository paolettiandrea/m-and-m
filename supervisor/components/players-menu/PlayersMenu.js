Vue.component("players-menu", {
  template: `<b-card header="Giocatori attivi" header-class="editor-text" style="overflow-y: auto; height: 100%">
      <descriptive-placeholder :fullIf="atLeastOnePlayer" text="Nessun giocatore" subText="Non appena un giocatore si connettera' apparira' qui">
        <div v-for="player in players">
            <player-menu-card :player="player"></player-menu-card>
        </div>
      </descriptive-placeholder>
    </b-card>`,

  computed: {
    ...Vuex.mapGetters(["players"]),

    atLeastOnePlayer() {
      return !(this.players && Object.keys(this.players).length === 0)
    }
  },

  methods: {},
});

Vue.component("player-menu-card", {
  template: `
    
            <b-card href="#" @click="playerClicked(player.id)" :bg-variant="cardVariant">
                <template #header>
                    <editable-text :targetObject="player" targetFieldName="givenName" :placeholder="player.id"></editable-text>
                </template>
            
                <descriptive-placeholder :fullIf="playingMissionData && playingActivityData" text="In attesa di informazioni." textSize="0.75em">
                <div v-if="playingMissionData && playingActivityData">
                  <span>{{playingMissionData.head.title}}</span> - <span>{{playingActivityData.title}}</span>
                  <last-activity-displayer :keyy="player.id" :time="player.lastStateChangeTime" :connectionTime="player.connectionTime" :maxMinutes="3"></last-activity-displayer>
                </div>
                </descriptive-placeholder>
            
            </b-card>
    `,

  props: {
    player: null,
  },
  data() { return {
    givenName: ""
  }},
  methods: {
    playerClicked(playerId) {
      this.$store.dispatch("selectPlayer", playerId);
    },
  },

  computed: {
    ...Vuex.mapGetters([
      "missionHeads",
      "missionContents",
      "pendingActions",
    ]),

    cardVariant() {
      if (this.isPlayerPending) { return 'warning'}
      else { return "light"}
    },

    playerPendingActions() {
      return this.pendingActions[this.player.id];
    },

    isPlayerPending() {
      return (
        this.playerPendingActions.scoring.length > 0 ||
        this.playerPendingActions.hint
      );
    },

    isPlayerSelected() {
      if (this.selectedPlayer) {
        return this.player.id === this.selectedPlayer.id;
      } else {
        return false;
      }
    },

    playingMissionData() {
      if (this.player.playingMissionId) {
        let data = {};
        data.head = this.missionHeads[this.player.playingMissionId];
        data.content = this.missionContents[this.player.playingMissionId];
        return data;
      } else {
        return null;
      }
    },

    playingActivityData() {
      if (this.player.playingActivityId && this.playingMissionData) {
        if (this.playingMissionData.content) {
          return this.playingMissionData.content.activities[
            this.player.playingActivityId
          ];
        }
      }
      return null;
    },
  },
});

Vue.component("last-activity-displayer", {
  template: `
        <div>
            <b-tooltip :target="labelId">
                {{tooltipLabel}}    
            </b-tooltip>
            <span :id="labelId" class="last-activity-elapsed-text" :class="{'elapsed-text-warning': maxMinutesPassed, 'elapsed-text-normal': !maxMinutesPassed}">{{elapsedLabel}}</span>
        </div>
    `,

  props: {
    time: null,
    keyy: null,
    connectionTime: null,
    maxMinutes: null,
  },

  data() {
    return {
      timer: null,
      elapsed_minutes: null,
    };
  },

  computed: {
    elapsedLabel() {
      let minutes = this.elapsed_minutes;
      if (minutes > 1) {
        return minutes + " minuti fa";
      } else {
        if (minutes === 1) {
          return "un minuto fa";
        } else {
          return "meno di un minuto fa";
        }
      }
    },

    tooltipLabel() {
      let s = "Ultima attivita': " + this.elapsedLabel;
      if (this.connectionTime) {
        s +=
          "\nConnesso: " +
          this.elapsedMinutes(this.connectionTime) +
          " minuti fa";
      }
      return s;
    },

    labelId() {
      return "last-activity-displayer-" + this.keyy;
    },

    maxMinutesPassed() {
      return this.elapsed_minutes > this.maxMinutes;
    },
  },

  watch: {
    time: function (val) {
      this.refreshElapsed();
    },
  },

  methods: {
    elapsedSeconds(time) {
      return Math.floor((Date.now() - time) / 1000);
    },
    elapsedMinutes(time) {
      return Math.floor(this.elapsedSeconds(time) / 60);
    },

    refreshElapsed() {
      this.elapsed_minutes = this.elapsedMinutes(this.time);
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.refreshElapsed();
    }, 1000);
  },
});
