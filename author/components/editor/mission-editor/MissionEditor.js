import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

Vue.component('mission-editor', {
    template: `
    <div>
        <b-navbar class="mm-navbar-primary">
            <b-navbar-brand href="#">{{barTitle}}</b-navbar-brand>
            
            <b-navbar-nav class="ml-auto" v-if="isMissionSelected">
                <b-button  v-on:click="updateSelectedMission" :disabled="isMissionUpdated"  variant="secondary-primary">
                    <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                </b-button>
                <b-nav-item-dropdown right variant="primary">
                    <template slot="button-content">
                        <b-icon icon="gear"></b-icon>
                    </template>
                    <b-dropdown-item href="#"><b-button v-on:click="setMissionSettingsPanel(true)" variant="outline-secondary"><b-icon icon="trash"></b-icon> Defaults </b-button></b-dropdown-item>
                    <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedMission" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                
                </b-nav-item-dropdown>
            </b-navbar-nav> 
        </b-navbar>
        
        <div v-if="isMissionSettingsPanelOpen">
            <defaults-editor></defaults-editor>
        </div>
        <div v-else id="yoyo" style="position: relative; height: 100%">
        

            
</b-collapse>
        <div id="g6Mount" style="position: absolute; top: 0; left: 0"></div>
</div>
    </div>`,

    computed: {
        ...Vuex.mapGetters({
            missionContent: 'selectedMissionContent',
            barTitle: 'missionBarTitle',
            isMissionSelected: 'isMissionSelected',
            isMissionUpdated: 'isSelectedMissionUpdated',
            isMissionSettingsPanelOpen: 'isMissionSettingsPanelOpen'
        })

    },

    data() {
        return {
            canvas: null,
            selectedActivity: null
        }
    },
    methods: {
        ...Vuex.mapActions([
            'deleteSelectedMission', 'updateSelectedMission', 'setMissionSettingsPanel'
        ]),
        activitySelectionCallback(selectedActivity) {
            this.selectedActivity = selectedActivity;
            this.$store.commit('selectActivity', selectedActivity.uuid);        // TODO bind directly to this (maybe)
            this.$emit('activity:selected', {
                activity: selectedActivity,
                callbacks: {
                    updateSelectedActivityTitle: (newTitle) => {
                        selectedActivity.title = newTitle;
                        this.canvas.updateActivityNode(selectedActivity);
                    }
                }
            });
        }
    },
    mounted() {
        this.$store.commit('initializeCanvasManager', {
            mountId: "g6Mount",
            callbacks: {
                selectionCallback: this.activitySelectionCallback
            }
        })

        window.onresize = () => {
            let yo = document.getElementById("yoyo");
            console.log(yo.clientHeight);
            this.$store.state.canvas.graph.changeSize(yo.clientWidth, yo.clientHeight);      // FIXME brutally resizing canvas
        }
    },

    components: {
        'defaults-editor': () => import('./DefaultsEditor.js')
    }

})