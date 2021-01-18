
Vue.component("supervisor-main", {
  template: `<div class="full-height">
        <b-row class="full-height" no-gutters>
            <b-col cols="4" class="full-height">
                <players-menu></players-menu>
            </b-col>
            <b-col cols="8" class="full-height">
                <player-main-panel v-if="selectedPlayer" :player="selectedPlayer"></player-main-panel>
            </b-col>
</b-row>
    </div>`,

  computed: {
    ...Vuex.mapGetters(["selectedPlayer"]),
  },
});

// Functionality:
// - see what the player is seeing
// - chat with the player [DONE]
// - see a list of the pending score and hint requests
Vue.component("player-main-panel", {
  template: `<b-row style="height: 100%" no-gutters>
        <b-col cols="6">
            <p> Preview </p>
        </b-col>
        <b-col cols="6" style="display: flex; flex-direction:column">
            <p style="flex:0"> Controls </p>
            <pending-actions-panel id="pending-actions-panel" class="side-panel" style="flex:1"></pending-actions-panel>
            <chat style="flex: 1" :chat="selectedPlayerChat" class="side-panel"></chat>
        </b-col>
    </b-row>`,

  props: {
    player: null,
  },

  computed: {
    ...Vuex.mapGetters(["selectedPlayerChat"]),
  },
});

Vue.component("pending-actions-panel", {
  template: `<div>
        <div v-if="selectedPlayerPendingActions.hint">
            <b-card>
                <span>Il giocatore ha richiesto un indizio</span>
                <b-input-group>
                    <b-form-input v-model="hintText" type="text"></b-form-input>
                    <b-button @click="sendHint()">Manda</b-button>
                </b-input-group>
            </b-card>
        </div>
    </div>`,
  data() {
    return {
      hintText: "",
    };
  },
  computed: {
    ...Vuex.mapGetters(["selectedPlayerPendingActions", "socket", "selectedPlayer", "pendingActions"]),
  },
  methods: {
    sendHint() {
        this.socket.emit('hint-for-player', {playerId: this.selectedPlayer.id, hint: this.hintText})
        this.pendingActions[this.selectedPlayer.id].hint = false;
    }
  },
});

Vue.component("chat", {
  template: `<div class="vertical-flex full-height" style="overflow-y:hidden; max-height: 100vh">


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
    </div>`,

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
