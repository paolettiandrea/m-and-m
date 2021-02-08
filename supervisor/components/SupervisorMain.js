Vue.component("supervisor-main", {
  template: `<div class="full-height"  style="display: flex; flex-direction: column">
        <b-navbar style="flex: 0">
          <b-navbar-brand>Supervisore</b-navbar-brand>  
        </b-navbar>
        <b-row class="" no-gutters style="flex:1; overflow: hidden; margin: 0.5em">
            <b-col cols="4" class="" style="height:100%">
                <players-menu></players-menu>
            </b-col>
            <b-col cols="8" class="" style="height:100%">
              <descriptive-placeholder :fullIf="selectedPlayer" text="Seleziona un giocatore" subText="Se un giocatore viene evidenziato necessita della tua supervisione">
                <player-main-panel :player="selectedPlayer" style="height: 100%"></player-main-panel>
              </descriptive-placeholder>
            </b-col>
</b-row>
    </div>`,

  computed: {
    ...Vuex.mapGetters(["selectedPlayer"]),
  },
});

Vue.component("player-main-panel", {
  template: `<b-row style="height: 100%" no-gutters>
        <b-col cols="6" style="height:100%">
          <div style="margin-left: 1em; margin-right: 1em">

            <div style="width:100%; text-align: center; " >
              <span class="editor-text"> Anteprima </span>
            </div>
            <b-card style="overflow:hidden">
                    <activity-displayer v-if="selectedPlayerActivity" class="full-flex activity-preview" style="overflow-y: auto" :activity-content="selectedPlayerActivity" :styling="selectedPlayerMissionContent.screenStylingData" :defaults="selectedPlayerMissionContent.defaults" 
                  >
          </activity-displayer>
            </b-card>
          </div>
      
        </b-col>
        <b-col cols="6" style="display: flex; flex-direction:column; overflow: hidden; height:100%">
            <pending-actions-panel id="pending-actions-panel" class="side-panel" style="flex:1"></pending-actions-panel>
            <chat style="flex: 1" :chat="selectedPlayerChat" class="side-panel"></chat>
        </b-col>
    </b-row>`,

  props: {
    player: null,
  },

  computed: {
    ...Vuex.mapGetters(["selectedPlayerChat", "selectedPlayerActivity", "selectedPlayerMissionContent", "pendingActions"]),
    selectedMissionContent() {
      this.player.playingMissionId
    },

  },
});

Vue.component("pending-actions-panel", {
  template: `<b-card style="overflow:auto"> 
       <template #header>
          <h5 class="mb-0 text-center editor-text">In attesa</h5>
        </template>
        <div v-if="selectedPlayerPendingActions.hint">

            <b-card header="Richiesta indizio">
                <b-input-group>
                    <b-form-input v-model="hintText" type="text"></b-form-input>
                    <b-button @click="sendHint()">Manda</b-button>
                </b-input-group>
            </b-card>
        </div>
        <b-card v-for="(pendingScoring,i) in selectedPlayerPendingActions.scoring" :key="i" header="Valutazione" header-class="editor-text">
          <p><b>Contesto e criteri: </b>{{pendingScoring.context}}</p>
          <component :is="'pending-scoring-' + pendingScoring.type" :scoringData="pendingScoring"></component>
          <b-input-group :prepend="String(pendingScoring.scoreRange.min)" :append="String(pendingScoring.scoreRange.max)" class="mt-3">
            <b-form-input v-model="pendingScoring.score" type="range" :min="pendingScoring.scoreRange.min" :max="pendingScoring.scoreRange.max"></b-form-input>
          </b-input-group>
          <b-button @click="sendScore(i)">Invia</b-button>
        </b-card>

    </b-card>`,
  data() {
    return {
      hintText: "",
    };
  },
  computed: {
    ...Vuex.mapGetters([
      "selectedPlayerPendingActions",
      "socket",
      "selectedPlayer",
      "pendingActions",
    ]),
  },
  methods: {
    sendScore(scoringIndex) {
      let targetScoring = this.selectedPlayerPendingActions.scoring[
        scoringIndex
      ];
      this.socket.emit("player-scored", {
        playerId: this.selectedPlayer.id,
        scoreData: targetScoring,
      });
      this.selectedPlayerPendingActions.scoring.splice(scoringIndex,1);
    },
    sendHint() {
      this.socket.emit("hint-for-player", {
        playerId: this.selectedPlayer.id,
        hint: this.hintText,
      });
      this.pendingActions[this.selectedPlayer.id].hint = false;
    },
  },
});

Vue.component("pending-scoring-drawn-image", {
  template: `<div style="">
    <img :src="scoringData.dataUrl" style=""></img>
  </div>`,

  props: { scoringData: null },
});

Vue.component("chat", {
  template: `<b-card class="vertical-flex full-height" style="overflow-y:hidden; max-height: 100vh" body-class="side-panel-card-body">
        <template #header>
          <h5 class="mb-0 text-center editor-text">Chat</h5>
        </template>
  <!-- Message history -->
        <section style="flex: 1; overflow-y: auto">
            <div v-for="message in chat.messages" 
                style="display:flex"
                :class="{'message-out': message.author==='supervisor', 'message-in': message.author!=='supervisor'}">
                 <div v-if="message.author==='supervisor'" style="flex:1"></div>
                <div 
                :class="{'message-out-inner': message.author==='supervisor', 'message-in-inner': message.author!=='supervisor', 'message-box': true}">

                    <span>{{message.body}}</span>
                </div>
            </div>
        </section>

        <!-- Send message form -->
        <div style="flex: 0">
            <b-input-group>
                <b-form-input v-on:keydown.enter="sendMessage(message)" v-model="message"></b-form-input>
                    <template #append>
                        <b-button @click="sendMessage">Invia</b-button>
                    </template>
            </b-input-group>
        </div>
    </b-card>`,

  data() {
    return {
      message: "",
    };
  },

  props: {
    chat: null,
  },

  methods: {
    ...Vuex.mapActions(["sendSelectedPlayerMessage"]),
    sendMessage() {
      console.log("Sending message: ", this.message);
      this.sendSelectedPlayerMessage(this.message);
      this.message = "";
    },
  },

  computed: {
    ...Vuex.mapGetters(["socket"]),
  },
});
