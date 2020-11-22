import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

Vue.component('mission-editor', {
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
                <b-nav-item-dropdown right variant="primary">
                    <template slot="button-content">
                        <b-icon icon="gear"></b-icon>
                    </template>
                    <b-dropdown-item href="#">
                        <b-button v-if="!isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(true)" variant="outline-secondary"><b-icon icon="trash"></b-icon> Defaults </b-button>
                        <b-button v-if="isMissionSettingsPanelOpen" v-on:click="setMissionSettingsPanel(false)" variant="outline-secondary"><b-icon icon="trash"></b-icon> Missione </b-button>
                    </b-dropdown-item>
                    <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedMission" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                    <b-dropdown-item href="#">
                        <b-button v-b-modal.modal-1><b-icon icon="upc-scan"></b-icon> QR Code</b-button>
                        
                          <b-modal id="modal-1" title="QR Code">
                            <b-img :src="'/' + selectedMissionId + '/qrCode.svg'" fluid></b-img>
                            <p class="editor-text"> Questo codice può essere inquadrato dal player per lanciare la missione.</p>
                          </b-modal>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav> 
        </b-navbar>
        
        <div v-if="isMissionSettingsPanelOpen" class="full-flex vertical-scroll">
            <mission-defaults-editor :defaults="missionContent.defaults" :uberDefaults="uberDefaults"></mission-defaults-editor>
        </div>
        <div v-else id="yoyo" style="position: relative; height: 100%">
            <div v-if="isWaitingForActivityClick" style="z-index: 3">
                <p>Seleziona una attività o </p>
                <b-button size="sm" @click="deleteActivityClickedCallback" variant="danger">annulla</b-button>
             </div>
            <div id="g6Mount" style="position: absolute; top: 0; left: 0"></div>
        </div>
    </div>`,

    computed: {
        ...Vuex.mapGetters({
            missionContent: 'selectedMissionContent',
            missionHead: 'selectedMissionHead',
            barTitle: 'missionBarTitle',
            isMissionSelected: 'isMissionSelected',
            isMissionUpdated: 'isSelectedMissionUpdated',
            isMissionSettingsPanelOpen: 'isMissionSettingsPanelOpen',
            selectedMissionId: 'selectedMissionId',
            isWaitingForActivityClick: 'isWaitingForActivityClick'
        }),

        uberDefaults() { return uberDefaults; }

    },

    data() {
        return {
            canvas: null,
            selectedActivity: null
        }
    },
    methods: {
        ...Vuex.mapActions([
            'deleteSelectedMission', 'updateSelectedMission', 'setMissionSettingsPanel', 'deleteActivityClickedCallback'
        ]),
        activitySelectionCallback(selectedActivity) {
            this.selectedActivity = selectedActivity;
            this.$store.commit('selectActivity', selectedActivity.uuid);        // TODO bind directly to this (maybe)
        },
        playMission() {
            window.location.href = '/player?missionId=' + this.selectedMissionId
        }
    },

    mounted() {
        this.$store.dispatch('canvasSetup', {
            mountId: "g6Mount",
            callbacks: {
                selectionCallback: this.activitySelectionCallback
            }
        })

        window.onresize = () => {
            let yo = document.getElementById("yoyo");
            this.$store.state.canvas.graph.changeSize(yo.clientWidth, yo.clientHeight);      // FIXME brutally resizing canvas
        }
    }

})