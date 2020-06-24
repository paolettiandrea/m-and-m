import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

export default {
    template: `
    <div onresize="console.log('dasd')">
        <b-navbar variant="primary">
            <b-navbar-brand href="#">{{barTitle}}</b-navbar-brand>
            
            <b-navbar-nav class="ml-auto" v-if="isMissionSelected">
                <b-button  v-on:click="updateSelectedMission" :disabled="isMissionUpdated"  variant="secondary-primary">
                    <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                </b-button>
                <b-nav-item-dropdown right variant="primary">
                    <template slot="button-content">
                        <b-icon icon="gear"></b-icon>
                    </template>
                    <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedMission" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav> 
        </b-navbar>
        <div id="yoyo">
        
        <div id="g6Mount" style="overflow: hidden; height: 80%; margin: 0 auto"></div>
</div>
    </div>`,

    computed: {
        ...Vuex.mapGetters({
            missionContent: 'selectedMissionContent',
            barTitle: 'missionBarTitle',
            isMissionSelected: 'isMissionSelected',
            isMissionUpdated: 'isSelectedMissionUpdated'
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
            'deleteSelectedMission', 'updateSelectedMission'
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
            let yo = document.getElementById("g6Mount");
            //this.$store.state.canvas.graph.changeSize(yo.offsetWidth, yo.offsetHeight - 10);      // FIXME brutally resizing canvas
        }
    }

}