Vue.component("lastScreen-displayer", {
  template: `
<div class="lastscreenbackground" style="height:100%; background-image:url(player/861304.jpg)">
   <div style="font-family:Roboto;  text-align:center; font-style:serif; height:100%; padding-top:3em; padding-buttom:6em;">
        <transition name="content-slide" mode="out-in">
          <div style="backgroundColor:#ffffff; opacity:0.8; padding:1em; margin-left: 2em; margin-right: 2em;">
              <div style=" border: 0.1em solid black;
                           font-weight: bold;
                           color: #000000;">

                <div class="h2 mb-0" role="banner">
                  <b-icon icon="trophy-fill" aria-label="Congratulazioni! Hai concluso la missione!"></b-icon>
               </div>

               <!-- Waiting for group -->
              <div v-if="waitingForGroup">
                <p>In attesa che gli altri membri del tuo gruppo finiscano...</p>
              </div>

              <!-- Actual last screen panel -->
              <div v-else>
                 <p style="fontStyle:italic;"> Punteggio finale: {{score}}</p>
                <p>  </p>
                <div v-if="missionRecap && missionRecap.playTime">
                  <p style="fontStyle:italic;">Tempo impiegato: {{Math.trunc(missionRecap.playTime)}} secondi</p>
                </div>
                <br></br>



                <div align="center" style="margin-left:2em; margin-bottom:1em;">
                  <b-form inline>
                  <label for="inline-form-input-name"style="margin-right:1em; margin-top:0;">Inserisci il nome: </label>
                  <b-form-input
                    id="inline-form-input-name"
                      v-model="playerInputName"
                      style="margin-top:0;"
                    placeholder="Inserisci il tuo nome"
                  ></b-form-input>
                  <b-button @click="sendScore">Salva il punteggio</b-button>
                  </b-form>
                </div>
                <div v-if="missionRecap && missionRecap.rankings" role="navigation" aria-label="Classifica">
                  <b-table :items="missionRecap.rankings" :fields="[
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
          </div>
        </transition>
      </div>
    </div>
    `,
  props: {
    score: 0,
    missionType: ""
  },

  data() {
    return {
      missionRecap: null,
      playerInputName: "",
      waitingForGroup: false,
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
      window.location.href = "/player"
    },
  },

  mounted() {
    console.log("Mission ended");

    socket.on("mission-recap", (missionRecap) => {
      console.log("Mission recap received: ", missionRecap);
      this.missionRecap = missionRecap;
      this.waitingForGroup = false;
    });

    socket.on("mission-recap-group", (missionRecap) => {
      console.log("Mission recap received for group: ", missionRecap);
      this.score = missionRecap.groupScore;
      this.missionRecap = missionRecap;
      this.waitingForGroup = false;
    });

    socket.on("wait-for-group", () => {
      console.log("Waiting for group socket event");
      this.waitingForGroup = true;
    })

    socket.on('close-mission', () => {
      console.log("Received close mission socket event");
      window.location.href = "/player"
    })

    if (this.missionType==='classe') {
      socket.emit("class-mission-ended", this.score);
    } else {
      socket.emit("mission-ended", this.score);
    }
  
  },
});
