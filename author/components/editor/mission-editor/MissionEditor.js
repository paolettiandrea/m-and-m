import { CanvasManager } from "./CanvasManager.js";
import { v1 as uuidv1 } from "/uuid/dist/esm-browser/index.js";

Vue.component("mission-editor", {
  template: `
    <div>
        <b-navbar class="mm-navbar-primary">
            <b-navbar-brand href="#">
                <b-form-input size="sm" v-model="missionHead.title" style="padding: 0px"></b-form-input>
            </b-navbar-brand>
            
            <b-navbar-nav class="ml-auto" v-if="isMissionSelected">
                <b-button  v-on:click="updateSelectedMission" :disabled="isMissionUpdated"  variant="secondary-primary">
                    <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click="playMission"> 
                    <b-icon icon="play"></b-icon> 
                </b-button>
                <b-button @click="pasteActivity">Incolla attivita</b-button>
                      <b-button v-if="!isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(true)" variant="outline-secondary">Defaults </b-button>
                      <b-button v-if="isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(false)" variant="outline-secondary">Grafico attivita </b-button>
                      <b-button v-b-modal.modal-1><b-icon icon="upc-scan"></b-icon> QR Code</b-button>
                      <b-modal id="modal-1" title="QR Code">
                          <b-img :src="'/' + selectedMissionId + '/qrCode.svg'" fluid></b-img>
                          <p class="editor-text"> Questo codice può essere inquadrato dal player per lanciare la missione.</p>
                      </b-modal>
            </b-navbar-nav> 
        </b-navbar>
        

        <div  class="full-flex vertical-scroll" style="overflow: hidden">

            <div v-if="isMissionSettingsPanelOpen""style="height: 50%; overflow: auto">
                <mission-defaults-editor :defaults="missionContent.defaults" :uberDefaults="uberDefaults" :missionContent="missionContent"></mission-defaults-editor>
            </div>
            <div id="yoyo" style="position: relative; height: 100%">
                <div v-if="isWaitingForActivityClick" style="z-index: 3">
                    <p>Seleziona una attività o </p>
                    <b-button size="sm" @click="deleteActivityClickedCallback" variant="danger">annulla</b-button>
                </div>
                <div id="g6Mount" style="position: absolute; top: 0; left: 0"></div>
        </div>
        </div>
    </div>`,

  computed: {
    ...Vuex.mapGetters({
      missionContent: "selectedMissionContent",
      missionHead: "selectedMissionHead",
      barTitle: "missionBarTitle",
      isMissionSelected: "isMissionSelected",
      isMissionUpdated: "isSelectedMissionUpdated",
      isMissionSettingsPanelOpen: "isMissionSettingsPanelOpen",
      selectedMissionId: "selectedMissionId",
      isWaitingForActivityClick: "isWaitingForActivityClick",
    }),

    uberDefaults() {
      return uberDefaults;
    },
  },

  data() {
    return {
      canvas: null,
      selectedActivity: null,
    };
  },
  methods: {
    ...Vuex.mapActions([
      "deleteSelectedMission",
      "updateSelectedMission",
      "setMissionSettingsPanel",
      "deleteActivityClickedCallback",
      "pasteActivity",
    ]),
    activitySelectionCallback(selectedActivity) {
      this.selectedActivity = selectedActivity;
      this.$store.commit("selectActivity", selectedActivity.uuid); // TODO bind directly to this (maybe)
    },
    playMission() {
      window.location.href = "/player?missionId=" + this.selectedMissionId;
    },
  },

  mounted() {
    this.$store.dispatch("canvasSetup", {
      mountId: "g6Mount",
      callbacks: {
        selectionCallback: this.activitySelectionCallback,
      },
    });

    let yo = document.getElementById("yoyo");
    this.$store.state.canvas.graph.changeSize(yo.clientWidth, yo.clientHeight); // FIXME brutally resizing canvas

    window.onresize = () => {
      let yo = document.getElementById("yoyo");
      this.$store.state.canvas.graph.changeSize(
        yo.clientWidth,
        yo.clientHeight
      ); // FIXME brutally resizing canvas
    };
  },
});
