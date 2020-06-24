export default {
    template: `
        <div class="column-flex-container" v-if="activityData">
            
            <b-navbar variant="primary">
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
            
            <div class="no-flex-grow">
                <b-form v-on:submit.prevent="titleValidation">
                <b-form-group class="labeled-form-group" label="Title" label-for="title-input" label-cols="3">
                    <b-form-input id="title-input"
                                  v-model="title"
                                  type="text"
                    ></b-form-input>
                </b-form-group>
            </b-form>
            </div>
            
            <div class="full-flex vertical-scroll" style="align-content: center">
            
                <div v-if="this.activityData.content.length == 0">
                    <content-type-selector @new:content="newContent" :chunkIndex="0"></content-type-selector>
                </div>
                
                <activity-displayer class="activity-displayer-div" :activity-content="activityData" 
                        @content:chunk:clicked="contentChunkClicked" @input:clicked="inputClicked">
                <template v-slot:inter="props">
                    <b-collapse :id="'add-content-collapse-'+props.index">
                        <content-type-selector @new:content="newContent" :chunkIndex="props.index"></content-type-selector>
                    </b-collapse>
                </template>
                
                <template v-slot:input-placeholder>
                    <input-type-selector @input:selected="handleInputSelected"></input-type-selector>
                </template>
            </activity-displayer>
            
                
            </div>
            <div class="no-flex-grow">
            
            <b-collapse v-model="isChunkSelected">
                        <input-editor v-if="selectedInput!=null"
                                      :inputData="selectedInput"></input-editor>
                        <content-editor v-else
                            :contentChunk="selectedContentChunk" :chunkIndex="selectedIndex"
                            @deselected="select(NaN)" @delete="deleteContent" @move="moveContentChunk">    
                        </content-editor>
            </b-collapse>
        </div>    
    </div>
    `,

    computed: {
        ...Vuex.mapGetters({
            activityData: 'selectedActivity'
        })
    },

    data() {
        return {
            title: "",
            selectedContentChunk: null,
            selectedInput: null,
            isChunkSelected: false,
            selectedIndex: NaN,
        }
    },

    methods: {
        titleValidation() {
            this.activityData.callbacks.updateSelectedActivityTitle(this.title);
        },

        newContent(newContentData) {
            this.activityData.content.splice(newContentData.index, 0, newContentData.contentChunk);
            this.select(newContentData.index, newContentData.contentChunk);
        },

        deleteContent(chunkIndex) {
            this.activityData.content.splice(chunkIndex, 1);
            this.select(NaN);
        },

        moveContentChunk(moveData) {
            let newIndex = moveData.index + moveData.offset;
            if (newIndex >= 0 && newIndex < this.activityData.content.length) {
                this.activityData.content.splice(moveData.index, 1);
                this.activityData.content.splice(newIndex, 0, this.selectedContentChunk);
                this.select(newIndex, this.selectedContentChunk);
            }
        },

        contentChunkClicked(contentData) {
            if (contentData.index===this.selectedIndex) {
                this.select(NaN);
            } else {
                this.select(contentData.index, contentData.content);
            }
        },

        inputClicked(inputData) {
            this.selectedInput = inputData;
            this.selectedContentChunk=null;
            this.isChunkSelected = true;
        },

        handleInputSelected(inputComponentData) {
            this.activityData.inputComponent = inputComponentData;
        },


        select(chunkIndex, contentData) {
            this.selectedInput = null;
            // If already selected first deselect
            if (!isNaN(this.selectedIndex)) {
                this.toggleAddButton(this.selectedIndex);
                this.isChunkSelected = false;
            }

            this.selectedIndex = chunkIndex;
            if (!isNaN(this.selectedIndex)) {
                this.isChunkSelected = true;                // FIXME probabilmente superfluo
                this.toggleAddButton(this.selectedIndex);
                this.selectedContentChunk = contentData;
            }
        },

        toggleAddButton(contentChunkIndex) {
            this.$root.$emit('bv::toggle::collapse', 'add-content-collapse-'+contentChunkIndex);
            this.$root.$emit('bv::toggle::collapse', 'add-content-collapse-'+(contentChunkIndex+1));
        }
    },

    components: {
        "content-type-selector": () => import("./ContentTypeSelector.js"),
        "input-type-selector": () => import("./InputContentSelector.js"),
        "content-editor": () => import("./content-chunk-editors/ContentEditor.js"),
        "input-editor": () => import("./input-editors/InputEditor.js")
    }
}