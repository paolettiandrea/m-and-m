import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

export default {
    template: `
    <div onresize="console.log('dasd')">
        <b-button v-on:click="newActivity()">+</b-button>

        
            <div id="g6Mount" class="no-flex-grow full-height"></div>
    </div>`,
    props: {
        missionContent: null
    },
    data() {
        return {
            canvas: null,
            selectedActivity: null
        }
    },
    watch: {
        "missionContent": {
            handler: function(after, before) {
                this.canvas.newData(after);
            }
        },
        "selectedActivity.title": {
            handler: function(after, before) {
                console.log("Changed title to" + after);
            }
        }
    },
    methods: {
        activitySelectionCallback(selectedActivity) {
            this.selectedActivity = selectedActivity;
            this.$emit('activity:selected', {
                activity: selectedActivity,
                callbacks: {
                    updateSelectedActivityTitle: (newTitle) => {
                        selectedActivity.title = newTitle;
                        this.canvas.updateActivityNode(selectedActivity);
                    }
                }
            });
        },
        newActivity() {
            var newActivity = {
                uuid: uuidv1(),
                title: "Nuova attività",
                content: [],
                inputComponent: null
            };
            this.missionContent.activities.push(newActivity);
            this.canvas.newActivity(newActivity);
        }
    },
    mounted() {
        const canvasSettings = {
            mountId: "g6Mount",
            callbacks: {
                selectionCallback: this.activitySelectionCallback
            }
        }
        this.canvas = new CanvasManager(this.missionContent, canvasSettings);
        window.onresize = () => {
            let yo = document.getElementById("g6Mount");

            console.log(yo);
            this.canvas.graph.changeSize(yo.clientWidth, yo.clientHeight);      // FIXME brutally resizing canvas
        }
    }

}