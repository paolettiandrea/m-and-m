Vue.component('activity-editor', {
    template: ` 
        <div class="column-flex-container">
            <div>
            
                <div v-for="(content, index) of activity.content">
                    <activity-editor-component-panel :index="index" :componentData="content" ></activity-editor-component-panel>
                
                </div>
                <div v-if="activity.inputComponent">
                    <activity-editor-component-panel :componentData="activity.inputComponent"></activity-editor-component-panel>
                </div>
                <div v-else>
                
                </div>
            </div>
        
        </div>
    `,

    computed: {
        ...Vuex.mapGetters({
            selectedMissionContent: 'selectedMissionContent',
            activity: 'selectedActivity',
            selectedActivityChunk: 'selectedActivityChunk',
            isChunkSelected: 'isChunkSelected',
            isInputChunkSelected: 'isInputChunkSelected',
            selectedActivityChunkIndex : 'selectedActivityChunkIndex'
        })
    },

    data() {
        return {
        }
    },

    methods: {
        ...Vuex.mapActions(['addContentChunk', 'setInputChunk']),

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
