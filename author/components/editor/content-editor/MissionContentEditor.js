import { CanvasManager } from './CanvasManager.js';
import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

export default {
    template: `
    <div>
        <b-button v-on:click="newActivity()">+</b-button>
        <div id="g6Mount"></div>
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
                content: []
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
    }

}