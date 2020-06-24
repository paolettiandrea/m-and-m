import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

export default {
    template: `
    <div onresize="console.log('dasd')">
        <b-navbar variant="primary">
            <b-navbar-brand href="#">{{barTitle}}</b-navbar-brand>
            
            <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <template slot="button-content">
                    <b-icon icon="gear"></b-icon>
</template>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedMission" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
        </b-nav-item-dropdown>
                <b-button-group>
                    
</b-button-group>
</b-navbar-nav>
</b-navbar>
        <b-button v-on:click="newActivity()">+</b-button>
            <div id="g6Mount" class="no-flex-grow full-height"></div>
    </div>`,

    computed: {
        ...Vuex.mapGetters({
            missionContent: 'selectedMissionContent',
            barTitle: 'missionBarTitle'
        })
    },

    data() {
        return {
            canvas: null,
            selectedActivity: null
        }
    },
    watch: {

    },
    methods: {
        ...Vuex.mapActions([
            'deleteSelectedMission'
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
        const canvasSettings = {
            mountId: "g6Mount",
            callbacks: {
                selectionCallback: this.activitySelectionCallback
            }
        }
        this.canvas = new CanvasManager(canvasSettings, this.$store);
        window.onresize = () => {
            let yo = document.getElementById("g6Mount");

            this.canvas.graph.changeSize(yo.clientWidth, yo.clientHeight);      // FIXME brutally resizing canvas
        }
    }

}