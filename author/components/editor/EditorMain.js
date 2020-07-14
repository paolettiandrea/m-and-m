Vue.component('editor-main', {
    template: `
    <div class="full-height">
        <b-row class="full-height">
            
            <b-col class="full-height no-horizontal-padding" >
                <div class="full-height">
                    <mission-editor
                        class="full-height column-flex-container no-flex-grow"
                        @activity:selected="activitySelectedCallback">
                    </mission-editor>
                </div>
            </b-col>
            
            <transition name="activity-panel-transition">
                <b-col v-if="selectedActivity" class="full-height no-horizontal-padding" key="2">
                    <activity-preview class="full-height"></activity-preview>
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
    }
})