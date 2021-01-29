Vue.component("lastScreen-displayer", {
  template: `
<div class="lastscreenbackground" style="height:100%; background-image:url(player/861304.jpg)">
   <div style="font-family:Roboto;  text-align:center; font-style:serif; height:100%; padding-top:3em; padding-buttom:6em;">
        <transition name="content-slide" mode="out-in">
          <div style="backgroundColor:#ffffff; opacity:0.8; padding:1em; margin-left: 10em; margin-right: 10em;">
              <div style=" border: 0.1em solid black;
                           font-weight: bold;
                           color: #000000;">
                <p style="fontStyle:italic;"> Punteggio finale: {{score}}</p>
                <p>  </p>
                <div v-if="missionRecap">
                  <p style="fontStyle:italic;">Tempo impiegato: {{missionRecap.playTime}} secondi</p>
                </div>
                <br></br>
                <b-form-group label="Inserisci il tuo nome">
                  <b-form-input v-model="playerInputName"></b-form-input>

                  <b-button @click="sendScore">Invia</b-button>
                </b-form-group>

                <div v-if="missionRecap && missionRecap.rankings">
                  <b-table :items="missionRecap.rankings" :fields= "[
                  {
                    key: 'playerName',
                    sortable: false,
                    label: 'Nome'
                  },
                  {
                    key: 'playTime',
                    sortable: true,
                    label: 'Tempo'
                  },
                  {
                    key: 'score',
                    label: 'Punteggio',
                    sortable: true,
                    // Variant applies to the whole column, including the header and footer
                  }
                ]"></b-table>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    `,
  props: {
    score: 0,
  },

  data() {
    return {
      missionRecap: null,
      playerInputName: "",
    };
  },

  methods: {
    sendScore(yo) {
      console.log("Sending score with name ", yo);
      console.log("Mission recap", this.missionRecap);
      socket.emit("new-score", {
        playerName: this.playerInputName,
        playTime: this.missionRecap.playTime,
        score: this.score,
      });
    },
  },

  mounted() {
    console.log("Mission ended");
    socket.on("mission-recap", (missionRecap) => {
      console.log("Mission recap received: ", missionRecap);
      this.missionRecap = missionRecap;
    });

    socket.emit("mission-ended");
  },
});
