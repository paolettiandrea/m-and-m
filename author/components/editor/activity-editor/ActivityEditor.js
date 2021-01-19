Vue.component('activity-editor', {
    template: ` 
        <div class="column-flex-container">
            <div>
                <span>Schermata</span>
                <screen-style-editor :screenStyleData="activity.screenStyleData"></screen-style-editor>
                <span> Contenuti </span> 
                <div v-for="(content, index) of activity.content">
                    <activity-editor-component-panel :index="index" :componentData="content" :last="index===activity.content.length-1"></activity-editor-component-panel>
                
                </div>
                
                <content-type-selector @content:type:selected="addContentChunk" ></content-type-selector>
                
                <div v-if="activity.inputComponent">
                    <activity-editor-component-panel :componentData="activity.inputComponent"></activity-editor-component-panel>
                </div>
                <div v-else>
                    <input-type-selector @input:selected="setInputChunk"></input-type-selector>
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
