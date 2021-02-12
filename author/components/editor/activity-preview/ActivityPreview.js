Vue.component('activity-preview', {
    template: `
        <div class="column-flex-container" v-if="activityData">
            
           
            
            <div class="full-flex vertical-scroll activity-preview-container">
            
                <div class="vertical-flex full-flex" style="justify-content: center; height: 100%; padding: 10px">
                    <descriptive-placeholder class="full-flex" :fullIf="!isActivityEmpty" text="L' attivita' e' vuota" subText="Aggiungi contenuti e personalizza la schermata tramite il pannello destro">
                        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-content: center; margin">
                            <activity-displayer class="full-flex activity-preview"  :activity-content="activityData" :styling="selectedMissionContent.screenStylingData" :defaults="selectedMissionContent.defaults" 
                                    @content:chunk:clicked="contentChunkClicked" @input:clicked="inputClicked">
                            </activity-displayer>
                        </div>
                    </descriptive-placeholder>
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
            selectedActivityChunkIndex : 'selectedActivityChunkIndex',

         
        }),
        isActivityEmpty() {
            return this.activityData.content.length === 0 && this.activityData.inputComponent === undefined
        }
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