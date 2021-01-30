export default {
  template: `
        <div style="text-align:center; overflow-y: auto">
            <b-row no-gutters style="margin-left: 1em; margin-right: 1em">
                <b-col>
                    <h3 class="editor-text"> Disponibili al pubblico</h3>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="!mission.head.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
                <b-col>
                    <h3 class="editor-text"> Archiviate </h3>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="mission.head.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
            </b-row>
                <b-button @click="createMission" variant="success" class="editor-font">Crea nuova missione</b-button>
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
    variant: { default: "primary" },
  },

  methods: {
    buttonClicked() {
      this.$emit("click");
    },
  },

  computed: {
    keyId() {
      return "tooltip-button-" + this.keyy + this.tooltip;
    },
  },
});

Vue.component("mission-info-card", {
  template: `<b-card class='mission-card' body-class="mission-card-body" :img-src="'/' + mission.id + '/qrCode.svg'" img-alt="Card image" img-right img-height="200px" img-width="200px" style="margin-left: 0.5em; margin-right: 0.5em; margin-bottom: 1em">
            <b-card-title>{{mission.head.title}}</b-card-title>
            <b-card-sub-title class="mb-2">{{mission.head.summary}}</b-card-sub-title>

            <span class="text-muted small">Giocatore: <b>{{playerType}}</b>, Fascia d'eta': <b>{{targetAge}}</b></span>
            <span v-if="mission.head.accessible" class="text-muted small">, <span class="text-success"><b>Accessibile</b></span></span>

            <template #footer>
                <b-button-toolbar class="mission-card-button-toolbar" vertical  style="display: flex; flex-direction: column">
                    <b-button-group vertical>
                        <tooltip-button @click="selectMission(mission.id)" tooltip="Modifica" :keyy="mission.id"><b-icon icon="brush"></b-icon></tooltip-button>
                        <tooltip-button v-if="!mission.archived" @click="playMission(mission.id)" tooltip="Gioca" :keyy="mission.id"><b-icon icon="play"></b-icon></tooltip-button>
                        <tooltip-button v-if="!mission.archived" @click="downloadRanking" tooltip="Scarica classifica" :keyy="mission.id"><b-icon icon="download"></b-icon></tooltip-button>
                    </b-button-group>
                    <b-button-group>
                      <confirm-button icon="trash" variant="danger" key="cancelMission" confirmPrompt="Sei sicuro di voler eliminare la missione?" @confirmed="deleteMission(mission.id)" :swapVariant="true"></confirm-button>
                    </b-button-group>
                </b-button-toolbar>
            </template>
    </b-card>`,

  props: {
    mission: null,
  },

  computed: {
    playerType() {
      if (this.mission.head.playerType) return this.mission.head.playerType;
      else return 'da definire'
    },
    targetAge() {
      if (this.mission.head.targetAge) return this.mission.head.targetAge + ' anni';
      else return 'da definire'
    }
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
        var fileURL = window.URL.createObjectURL(
          new Blob([JSON.stringify(rankings, null, 2)])
        );
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
