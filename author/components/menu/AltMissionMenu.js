export default {
  template: `
        <div >
            <b-row no-gutters>
                <b-col>
                    <p class="editor-text"> Disponibili al pubblico</p>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="!mission.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
                <b-col>
                    <p class="editor-text"> Archiviate </p>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="mission.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
            </b-row>
                
                <div style="text-align: center;">
                    <b-badge pill href="#" v-for="(mission, id) in activeMissions" v-on:click="selectMission(id)" :key="id" style=" font-size: 14px">{{mission.head.title}}</b-badge>           
                </div>
                
                <b-badge pill href="#" v-on:click="createMission" style=" font-size: 14px">+</b-badge>           

               
    </div>`,

  computed: Vuex.mapGetters(["activeMissions"]),
  methods: {
    ...Vuex.mapActions(["selectMission", "createMission"]),
    handleMissionSelectionRequest(newSelectionData) {
      if (this.selected) {
        this.selected.deselectionCallback();
      }
      this.selected = newSelectionData;
      if (this.selected) {
        this.selected.selectionCallback();
      }
      this.$emit("mission:selection:changed", newSelectionData);
    },
    handleMissionDeleted(deletedMissionHead) {
      for (let j = 0; j < this.availableMissions.length; j++) {
        if (this.availableMissions[j]._id === deletedMissionHead._id) {
          this.availableMissions.splice(j, 1);
          this.handleMissionSelectionRequest(null);
          break;
        }
      }
    },

  },
};

Vue.component("tooltip-button", {
  template: `
    <b-button :variant="variant" :id="keyId" @click="buttonClicked">
      <slot></slot>

    <b-tooltip :target="keyId">{{tooltip}}</b-tooltip>
    </b-button>
  `,

  props: {
    keyy: null,
    tooltip: "",
    variant: { default: 'primary'}
  },

  methods: {
    buttonClicked() { this.$emit('click')}
  },

  computed: {
    keyId() {
      return "tooltip-button-" + this.keyy + this.tooltip;
    }
  }
})

Vue.component("mission-info-card", {
  template: `<b-card :img-src="'/' + mission.id + '/qrCode.svg'" img-alt="Card image" img-right img-height="200px" img-width="200px">
        <b-card-body>
            <b-card-title>{{mission.head.title}}</b-card-title>
            <b-card-sub-title class="mb-2">{{mission.head.summary}}</b-card-sub-title>

            <div>
                <b-button-toolbar class="mission-card-button-toolbar" key-nav>
                    <b-button-group>
                        <tooltip-button @click="selectMission(mission.id)" tooltip="Modifica" :keyy="mission.id"><b-icon icon="brush"></b-icon></tooltip-button>
                        <tooltip-button v-if="!mission.archived" @click="playMission(mission.id)" tooltip="Gioca" :keyy="mission.id"><b-icon icon="play"></b-icon></tooltip-button>
                        <tooltip-button v-if="!mission.archived" @click="downloadRanking" tooltip="Scarica classifica" :keyy="mission.id"><b-icon icon="download"></b-icon></tooltip-button>
                    </b-button-group>
                    <b-button-group>
                        <tooltip-button v-if="!mission.archived" @click="archive()" tooltip="Archivia"><b-icon icon="archive"></b-icon></tooltip-button>
                        <tooltip-button v-else @click="publish()" tooltip="Pubblica" :keyy="mission.id"><b-icon icon="check-circle"></b-icon></tooltip-button>
                    </b-button-group>
                    <b-button-group>
                      <confirm-button icon="trash" variant="danger" key="cancelMission" confirmPrompt="Sei sicuro di voler eliminare l'attivita'?" @confirmed="deleteMission(mission.id)" :swapVariant="true"></confirm-button>
                    </b-button-group>
                </b-button-toolbar>
            </div>
        </b-card-body>
    </b-card>`,

  props: {
    mission: null,
  },
  methods: {
    ...Vuex.mapActions(["selectMission", "createMission", "deleteMission"]),
    playMission(id) {
      window.location.href = "/player?missionId=" + id;
    },

    downloadRanking() {
      axios.get("/missions/rankings/" + this.mission.id).then((res) => {
        let rankings = res.data;
        console.log("Got rankings response:", rankings);
        var fileURL = window.URL.createObjectURL(new Blob([JSON.stringify(rankings, null, 2)]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          "Classifica" + this.mission.head.title + ".json"
        );
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    publish() {
      Vue.set(this.mission, "archived", false);
    },
    archive() {
      Vue.set(this.mission, "archived", true);
      // TODO save on server
    },
  },
});
