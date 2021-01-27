Vue.component('player-main', {
    template: `
        <mission-displayer v-if="wasMissionChosen"></mission-displayer>
        <qr-reader v-else>Mission not chosen</qr-reader>
          `,
//per knob
data() {
  return {
    wasMissionChosen: false
  }
},

    components: {
    },

    mounted() {
    let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        let missionId = params.get("missionId")
        if (missionId) {
         this.wasMissionChosen = true;
        } 

    }
  })
