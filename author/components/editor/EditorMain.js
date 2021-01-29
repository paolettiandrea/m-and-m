Vue.component('editor-main', {
    template: `
    <div class="full-height">
        <b-row class="full-height" no-gutters>
            
            <b-col style="flex: 1" class="full-height no-horizontal-padding" >
                <div class="full-height">
                    <mission-editor
                        class="full-height column-flex-container no-flex-grow"
                        @activity:selected="activitySelectedCallback">
                    </mission-editor>
                </div>
            </b-col>
            
            <transition name="activity-panel-transition">
            
                <!-- Activity panel  -->
                <b-col style="flex: 2; display: flex; flex-direction: column; overflow-y:hidden" v-if="selectedActivity" class="full-height no-horizontal-padding" key="2">
                    <b-navbar class="mm-navbar-activity" style="flex:0">
                        <b-navbar-brand href="#">
                            <editable-text :targetObject="selectedActivity" targetFieldName="title"></editable-text>
                        </b-navbar-brand>
                    
                        <b-navbar-nav class="ml-auto">
                            <b-button @click="duplicateSelectedActivity()">Duplica</b-button>
                            <b-button @click="copySelectedActivity()">Copia</b-button>
                            <confirm-button v-if="selectedActivity.uuid!=='initial'" icon="trash" key="deleteActivity" confirmPrompt="Sei sicuro di voler eliminare l'attivita'?" @confirmed="deleteSelectedActivity" :swapVariant="true"></confirm-button>
                        </b-navbar-nav> 
                    </b-navbar>
                    <b-row class="full-height" no-gutters style="flex:1">
                        <b-col  class="full-height no-horizontal-padding" style="overflow-y: hidden">
                            <activity-preview class="full-height"></activity-preview>
                        </b-col>
                        <b-col class="full-height" style="overflow-y: auto">
                            <activity-editor class="full-height"></activity-editor>
                        </b-col>
                    </b-row>
                </b-col>
            </transition>
            
<!--            <transition name="content-panel-transition">-->
<!--            <b-col v-if="selectedActivityChunk" key="3" class="no-horizontal-padding full-height">-->
<!--                <chunk-editor class="full-height"></chunk-editor>-->
<!--            </b-col>-->
<!--            </transition>-->
        </b-row>
    </div>`,

    data() {
        return {
            selectedActivityData: null
        }
    },

    methods: {
        ...Vuex.mapActions(['deleteSelectedActivity', 'duplicateSelectedActivity', 'copySelectedActivity', 'pasteActivity']),
        activitySelectedCallback(selectedActivity) {
            this.selectedActivityData = selectedActivity;
        }
    },

    computed: {
        ... Vuex.mapGetters(['selectedActivity', 'selectedActivityChunk'])
    }
})