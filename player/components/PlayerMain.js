Vue.component('player-main', {
    template: `

        <mission-displayer v-if="wasMissionChosen" :missionHead="missionHeads[chosenMissionId]"></mission-displayer>
        <div v-else>
          <qr-reader></qr-reader>

          <div v-if="missionHeads">
            <p class=player-title>Oppure seleziona una delle missioni disponibili:</p>
            <div v-for="(mission,key) in missionHeads">
              <div v-if="!mission.archived">
                <a class=stories :href="'?missionId='+key">{{mission.title}}</a>
              </div>
            </div>
          </div>
          
        </div>
          `,

/*
<mission-displayer v-if="wasMissionChosen"></mission-displayer>
<div v-else>
  <qr-reader></qr-reader>

  <div v-if="missionHeads">
    <p>O seleziona una delle missioni disponibili</p>
    <div v-for="(mission,key) in missionHeads">
      <div v-if="!mission.archived">
        <a :href="'?missionId='+key">{{mission.title}}</a>
      </div>
    </div>
  </div>

</div>
*/

data() {
  return {
    wasMissionChosen: false,
    chosenMissionId: 0,

    missionHeads: null
  }

},

    components: {
    },

    mounted() {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      let missionId = params.get("missionId")
 

      axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;

                this.missionHeads = JSON.parse(res.data)
                console.log("Received mission heads:", this.missionHeads)


                if (missionId) {
                    this.wasMissionChosen = true;

                    this.chosenMissionId = missionId;
                  }
    })
      
  }
})
