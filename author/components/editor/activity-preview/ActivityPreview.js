Vue.component('activity-preview', {
    template: `
        <div class="column-flex-container" v-if="activityData">
            
            <b-navbar class="mm-navbar-activity">
            <b-navbar-brand href="#">{{activityData.title}}</b-navbar-brand>
            
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right variant="primary">
                    <template slot="button-content">
                        <b-icon icon="gear"></b-icon>
                    </template>
                    <b-dropdown-item href="#"><b-button v-on:click="" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav> 
        </b-navbar>
           
            
            <div class="full-flex vertical-scroll">
            
            <div style="display: flex; flex-direction: column; justify-content: center; height: 100%">
                <activity-displayer class="activity-displayer-div" :activity-content="activityData" :defaults="selectedMissionContent.defaults" 
                        @content:chunk:clicked="contentChunkClicked" @input:clicked="inputClicked">
                        
                        
                <template v-slot:last-content-chunk>
                        <content-type-selector @content:type:selected="addContentChunk" ></content-type-selector>
                </template>
                
                <template v-slot:input-placeholder>
                    <input-type-selector @input:selected="setInputChunk"></input-type-selector>
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
        ...Vuex.mapActions(['addContentChunk', 'setInputChunk']),

        contentChunkClicked(contentData) {
            this.$store.commit('setSelectedActivityChunk', contentData.index);
        },

        inputClicked(inputData) {
            this.$store.commit('setSelectedActivityChunk', -1);
        }
    }
})