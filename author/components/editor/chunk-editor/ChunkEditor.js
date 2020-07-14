Vue.component('chunk-editor', {
    template: `
        <div>
        
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
                    
                    <b-nav-item-dropdown right variant="primary">
                        <template slot="button-content">
                            <b-icon icon="gear"></b-icon>
                        </template>
                        <b-dropdown-item href="#"><b-button v-on:click="deleteSelectedActivityChunk" variant="outline-danger"><b-icon icon="trash"></b-icon> Cancella </b-button></b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav> 
            </b-navbar>
            
            <editor-subpanel label="Comuni" class="main-column">
                <common-styling-editor :commonData="selectedActivityChunk.commonData"></common-styling-editor>
            </editor-subpanel>
            
<!--        Display the appropriate input/content editor-->
            <div v-if="isChunkSelected" class="main-column">
                <component v-if="isInputChunkSelected" 
                            :is="selectedActivityChunk.inputType+'-editor'" 
                            :inputData="selectedActivityChunk.inputData" ></component>
                <component v-else
                            :is="selectedActivityChunk.contentType+'-editor'" 
                            :contentData="selectedActivityChunk.contentData" ></component>
                      
            </div>
        </div>
    `,

    computed: {
        ... Vuex.mapGetters(['selectedActivityChunk', 'selectedActivityChunkIndex', 'isChunkSelected',
            'isInputChunkSelected', 'isSelectedContentChunkLast', 'isSelectedContentChunkFirst' ])
    },

    methods: {
        ...Vuex.mapActions(['deleteSelectedActivityChunk', 'moveSelectedChunk'])
    }
})