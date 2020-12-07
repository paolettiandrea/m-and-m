Vue.component('activity-preview', {
    template: `
        <div class="column-flex-container" v-if="activityData">
            
           
            
            <div class="full-flex vertical-scroll activity-preview-container">
            
                <div class="vertical-flex full-flex" style="justify-content: center; height: 100%; padding: 10px">
                        <activity-displayer class="full-flex activity-preview" style="max-height: 500px;" :activity-content="activityData" :defaults="selectedMissionContent.defaults" 
                                @content:chunk:clicked="contentChunkClicked" @input:clicked="inputClicked">
                                
                            <template v-slot:last-content-chunk>
                            </template>
                            <template v-slot:input-placeholder>
                            </template>
                        </activity-displayer>
                </div>
   
                
            
            
                
            </div>
   
    </div>
    `,

    computed: {
        ...Vuex.mapGetters({
            selectedMissionContent: 'selectedMissionContent',
            activityData: 'selectedActivity',
            selectedActivityChunk: 'selectedActivityChunk',
            isChunkSelected: 'isChunkSelected',
            isInputChunkSelected: 'isInputChunkSelected',
            selectedActivityChunkIndex : 'selectedActivityChunkIndex'
        })
    },

    data() {
        return {
            title: "",
        }
    },

    methods: {

        contentChunkClicked(contentData) {
            this.$store.commit('setSelectedActivityChunk', contentData.index);
        },

        inputClicked(inputData) {
            this.$store.commit('setSelectedActivityChunk', -1);
        },

        titleClickHandler(newTitle) {
            this.$store.dispatch('renameSelectedActivity', newTitle);
        }
    }
})