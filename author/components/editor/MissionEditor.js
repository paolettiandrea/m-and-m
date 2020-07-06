export default {
    template: `
    <div class="full-height">
        <b-row class="full-height">
            
            <b-col class="full-height no-horizontal-padding" >
                <div class="full-height">
                    <mission-content-editor
                        class="full-height column-flex-container no-flex-grow"
                        @activity:selected="activitySelectedCallback">
                    </mission-content-editor>
                </div>
            </b-col>
            
            <transition name="activity-panel-transition">
                <b-col v-if="selectedActivity" class="full-height no-horizontal-padding" key="2">
                    <activity-editor class="full-height"></activity-editor>
                </b-col>
            </transition>
            
            <transition name="content-panel-transition">
            <b-col v-if="selectedActivityChunk" key="3" class="no-horizontal-padding">
                <chunk-editor></chunk-editor>
            </b-col>
            </transition>
        </b-row>
    </div>`,

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

    computed: {
        ... Vuex.mapGetters(['selectedActivity', 'selectedActivityChunk'])
    },
    components: {
        'mission-head-form': () => import('./MissionHeadForm.js'),
        'mission-content-editor': () => import('./content-editor/MissionContentEditor.js'),
        'activity-editor': () => import('./activity-editor/ActivityEditor.js'),
        'chunk-editor': () => import('./activity-editor/ChunkEditor.js')
    }
}