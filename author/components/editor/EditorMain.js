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
            
                 
                <b-col style="flex: 2" v-if="selectedActivity" class="full-height no-horizontal-padding" key="2">
                    <b-navbar class="mm-navbar-activity">
                        <b-navbar-brand href="#">
                            <b-form-input size="sm" v-model="selectedActivity.title" style="padding: 0px"></b-form-input>
                        </b-navbar-brand>
                    
                        <b-navbar-nav class="ml-auto">
                            <b-nav-item-dropdown right variant="primary">
                                <template slot="button-content">
                                    <b-icon icon="gear"></b-icon>
                                </template>
                                <b-dropdown-item href="#"><b-button v-on:click="" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav> 
                    </b-navbar>
                    <b-row class="full-height" no-gutters>
                        <b-col  class="full-height no-horizontal-padding">
                            <activity-preview class="full-height"></activity-preview>
                        </b-col>
                        <b-col>
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
        activitySelectedCallback(selectedActivity) {
            this.selectedActivityData = selectedActivity;
        }
    },

    computed: {
        ... Vuex.mapGetters(['selectedActivity', 'selectedActivityChunk'])
    }
})