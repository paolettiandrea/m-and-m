import { CanvasManager } from './CanvasManager.js';

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
            canvas: null
        }
    },
    watch: {
        "missionContent": {
            handler: function(after, before) {
                this.canvas.newData(after);
            }

        }
    },
    methods: {
        activitySelectionCallback(selectedActivity) {
            console.log("New selected activity");
            console.log(selectedActivity);
        },
        newActivity() {
            var newActivity = {
                title: "asddas",
                contentChunks: []
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