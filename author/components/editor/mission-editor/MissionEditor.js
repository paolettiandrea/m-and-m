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
                      <b-button v-if="!isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(true)" variant="outline-secondary"><b-icon icon="gear"></b-icon></b-button>
                      <b-button v-if="isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(false)" variant="outline-primary"><b-icon icon="gear"></b-icon></b-button>
                      <b-button v-b-modal.modal-1><b-icon icon="upc-scan"></b-icon></b-button>
                      <b-modal id="modal-1" title="QR Code">
                          <b-img :src="qrCodePath" fluid></b-img>
                          <p class="editor-text"> Questo codice può essere inquadrato dal player per lanciare la missione.</p>
                          <b-button @click="downloadQrCode">Download</b-button>
                      </b-modal>
            </b-navbar-nav> 
        </b-navbar>
        

        <div  class="full-flex vertical-scroll" style="overflow: hidden">

            <div v-if="isMissionSettingsPanelOpen""style="height: 50%; overflow: auto">
                <mission-defaults-editor :defaults="missionContent.defaults" :uberDefaults="uberDefaults" :missionContent="missionContent"></mission-defaults-editor>
                <activity-editor-subpanel label="Gestione da file">
                <b-row no-gutters>
                  <b-col>
                    <b-form-file
                        v-model="file"
                        :state="Boolean(file)"
                        placeholder="Aggiorna da file"
                        drop-placeholder="Trascina qui il file"
                        @input="updateFromFile"
                      ></b-form-file>
                  </b-col>
                  <b-col style="text-align:center"><span class="editor-text"> oppure </span></b-col>
                  <b-col>
                      <b-button variant="primary" @click="downloadMission" style="width: 100%">Scarica missione</b-button>
                  </b-col>
                </b-row>
                </activity-editor-subpanel>
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

    qrCodePath() {
      return '/' + this.selectedMissionId + '/qrCode.svg';
    },
    uberDefaults() {
      return uberDefaults;
    },
  },

  data() {
    return {
      canvas: null,
      selectedActivity: null,
      file: null
    };
  },
  methods: {
    ...Vuex.mapActions([
      "deleteSelectedMission",
      "updateSelectedMission",
      "updateSelectedMissionFromJson",
      "setMissionSettingsPanel",
      "deleteActivityClickedCallback",
      "pasteActivity",
    ]),
    updateFromFile() {
      console.log("Upload from file: ", this.file)
      const reader = new FileReader();
      let yo = reader.readAsText(this.file);
      reader.onload =  evt => {
        
        this.updateSelectedMissionFromJson(evt.target.result)
      }
    },
    downloadMission() {
      let saveString = JSON.stringify(this.missionContent, null, 2);

      const blob = new Blob([saveString], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = this.missionHead.title + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    activitySelectionCallback(selectedActivity) {
      this.selectedActivity = selectedActivity;
      this.$store.commit("selectActivity", selectedActivity.uuid); // TODO bind directly to this (maybe)
    },
    playMission() {
      window.location.href = "/player?missionId=" + this.selectedMissionId;
    },
    downloadQrCode() {
      console.log("downloading Qr Code");
      axios({
        url: this.qrCodePath,
        method: 'GET',
        responseType: 'blob',
    
    }).then((response) => {
         var fileURL = window.URL.createObjectURL(new Blob([response.data]));
         var fileLink = document.createElement('a');
      
         fileLink.href = fileURL;
         fileLink.setAttribute('download', this.missionHead.title + '-QrCode.svg');
         document.body.appendChild(fileLink);
       
         fileLink.click();
    });
    }
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
