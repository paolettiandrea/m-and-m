Vue.component("lastScreen-displayer", {
  template: `
<div class="lastscreenbackground" style="height:100%; background-image:url(https://c.wallhere.com/photos/39/ae/dinosaurs_Brachiosaurus_Stegosaurus_Triceratops_Pterodactyl-290781.jpg!d)">
   <div style="font-family:American Typewriter; text-align:center; font-style:serif; text-color:black;">
        <transition name="content-slide" mode="out-in">
          <div style=" margin: 30px;
                       background-color: #ffffff;
                       border: 1px solid black;
                       opacity: 0.6;">
              <h1 style="text-align: center; "> </h1>
              <div style=" margin: 5%;
                           font-weight: bold;
                           color: #000000;">
                <p> Punteggio finale: </p>
                <p> {{score}} </p>
                <div v-if="missionRecap">
                  <p>Tempo: {{missionRecap.playTime}}</p>
                </div>
                <b-form-group label="Inserisci il tuo nome">
                  <b-form-input v-model="playerInputName"></b-form-input>

                  <b-button @click="sendScore">Manda</b-button>
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
        <div style=" margin: 5%;
                     font-weight: bold;
                     color: #000000;"> Durante questo percorso avrai imparato diverse cose, tra cui.... </div>
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
