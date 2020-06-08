export default {
    template: `
    <div class="full-height">
        <b-row class="full-height">
            <b-col class="full-height" v-if="missionContent">
                <div class="full-height">
                    <mission-content-editor
                        class="full-height column-flex-container no-flex-grow"
                        :mission-content="missionContent" 
                        @activity:selected="activitySelectedCallback">
                    </mission-content-editor>
                </div>
            </b-col>
            <b-col class="full-height">
                <activity-editor class="full-height" :activity-data="selectedActivityData"></activity-editor>
            </b-col>
        </b-row>
    </div>`,

    props: {
        missionContent: Object
    },
    data() {
        return {
            selectedActivityData: null
        }
    },
    methods: {
        activitySelectedCallback(selectedActivity) {
            this.selectedActivityData = selectedActivity;
        }
    },
    components: {
        'mission-head-form': () => import('./MissionHeadForm.js'),
        'mission-content-editor': () => import('./content-editor/MissionContentEditor.js'),
        'activity-editor': () => import('./activity-editor/ActivityEditor.js')
    }
}