Vue.component('chunk-editor', {
    template: `
        <div class="full-height vertical-flex">
        
<!--        Navbar-->
            <b-navbar class="mm-navbar-chunk">
                <b-navbar-brand href="#">Editor</b-navbar-brand>
                
                <b-navbar-nav class="ml-auto">
                
                    <b-button-group v-if="!isInputChunkSelected">
                        <b-button size="sm" v-on:click="moveSelectedChunk(1)" :disabled="isSelectedContentChunkLast">
                            <b-icon icon="caret-down"></b-icon>
                        </b-button>
                        <b-button size="sm" v-on:click="moveSelectedChunk(-1)" :disabled="isSelectedContentChunkFirst">
                            <b-icon icon="caret-up"></b-icon>
                        </b-button>
                    </b-button-group>
                    
<!--                Normal editor / JSON editor toggle-->
                    <b-button v-if="editorMode==='normal'" @click="setEditorMode('json')">JSON</b-button>
                    <b-button v-else @click="setEditorMode('normal')">Normal</b-button>
                    
                    <b-nav-item-dropdown right variant="primary">
                        <template slot="button-content">
                            <b-icon icon="gear"></b-icon>
                        </template>
                        <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedActivityChunk" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav> 
            </b-navbar>
            
            <div class="full-flex"  style="overflow-y: auto">
            
    <!--        Display the appropriate input/content editor-->
                <div class="main-column">
                    <div v-if="editorMode==='normal'">
                        <component v-if="isInputChunkSelected" 
                                    :is="selectedActivityChunk.inputType+'-editor'" 
                                    :inputData="selectedActivityChunk.inputData" ></component>
                        <component v-else
                                    :is="selectedActivityChunk.contentType+'-editor'" 
                                    :contentData="selectedActivityChunk.contentData" ></component>
                              
                    
                    
                        <activity-editor-subpanel label="Generali" level="0">
                            <common-styling-editor :commonData="selectedActivityChunk.commonData" :defaults="compoundDefaults.commonData"></common-styling-editor>
                        </activity-editor-subpanel>
                    </div>
                    <div v-else>
                        <json-editor :editedObj="selectedActivityChunk"></json-editor>
                    </div>
                </div>
                
                <activity-editor-subpanel></activity-editor-subpanel>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            editorMode: 'normal'
        }
    },

    computed: {
        ... Vuex.mapGetters(['selectedActivityChunk', 'selectedActivityChunkIndex', 'isChunkSelected',
            'isInputChunkSelected', 'isSelectedContentChunkLast', 'isSelectedContentChunkFirst', 'selectedMissionDefaults']),

        compoundDefaults() {
            return buildDefaultObject(this.selectedMissionDefaults, uberDefaults);
        }
    },

    methods: {
        ...Vuex.mapActions(['deleteSelectedActivityChunk', 'moveSelectedChunk']),

        setEditorMode(newMode) {
            this.editorMode = newMode;
        }
    }
})