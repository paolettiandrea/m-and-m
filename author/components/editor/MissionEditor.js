export default {
    template: `
    <div>
        <b-row>
            <b-col v-if="missionContent">
                <div >
                    <mission-content-editor 
                        :mission-content="missionContent" 
                        @activity:selected="activitySelectedCallback">
                    </mission-content-editor>
                </div>
            </b-col>
            <b-col>
                <activity-editor :activity-data="selectedActivityData"></activity-editor>
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