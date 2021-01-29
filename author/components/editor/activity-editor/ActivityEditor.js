Vue.component('activity-editor', {
    template: ` 
        <div class="column-flex-container">
            <div>
                <!-- STILE SCHERMATA -->
                <div class="panel-section">
                    <div style="text-align:center">
                        <span class="editor-text">Stile schermata</span> 
                    </div>
                    <screen-style-editor :screenStyleData="activity.screenStyleData"></screen-style-editor>
                </div>
                
                <!-- CONTENUTI -->
                <div class="panel-section">
                    <div style="text-align:center">
                        <span class="editor-text">Contenuti</span> 
                    </div>
                    <div v-for="(content, index) of activity.content">
                        <activity-editor-component-panel :index="index" :componentData="content" :last="index===activity.content.length-1"></activity-editor-component-panel>
                    
                    </div>
                    
                    <content-type-selector @content:type:selected="addContentChunk" ></content-type-selector>
                </div>
                <!-- INPUT -->
                    <div class="panel-section">
                        <div style="text-align:center">
                            <span class="editor-text">Input</span> 
                        </div>
                    <div v-if="activity.inputComponent">
                        <activity-editor-component-panel :componentData="activity.inputComponent"></activity-editor-component-panel>
                    </div>
                    <div v-else>
                        <input-type-selector @input:selected="setInputChunk"></input-type-selector>
                    </div>
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
